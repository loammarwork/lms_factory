/** @format */

const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { Echutter, PerformanceSheetProductionTime, sequelize, StoreSideLine, chi_product, ModeType } = require("../models");

const TransformDataEchutteToClient = require("../utils/TransformDataEchutterToClient");
function DateNow() {
  return Date.now() + "." + String(process.hrtime()[1]).slice(3, 8);
}

router.get("/graph-problem", async (req, res) => {
  let graph = await Echutter.findAll({
    attributes: ["error_code", [sequelize.fn("COUNT", sequelize.col("error_code")), "amount"]],
    where: {
      error_code: {
        [Op.ne]: 0,
      },
    },
    group: "error_code",
    order: sequelize.literal("amount DESC"),
  });
  res.json(graph);
});

router.get("/", async (req, res) => {
  let mode_type = await ModeType.findAll({ raw: true }).catch((err) => console.log(err));
  let echutter;

  if (mode_type[0].mode_type === 0) {
    try {
      let storeSideLine = await StoreSideLine.findAll({ attributes: ["pd_code", [sequelize.literal("stock_kanban_max - kanban_actual"), "want_to_fill"], "location"], raw: true });
      /*  let echutter_pd_code_amount = await Echutter.findAll({
        attributes: ["pd_code", [sequelize.fn("COUNT", sequelize.col("pd_code")), "amount"]],
        where: {
          timestamp_finish: {
            [Op.eq]: 0,
          },
        },
        raw: true,
      }); */
      let echutters = await Echutter.findAll({ raw: true });
      if (echutters.length === 0) {
        for (let i = 0; i < storeSideLine.length; i++) {
          for (let j = 0; j < storeSideLine[i].want_to_fill; j++) {
            await Echutter.create({ pd_code: storeSideLine[i].pd_code, timestamp_from_sender: DateNow(), timestamp_finish_work: "0" });
          }
        }
      }
      echutter = await sequelize
        .query(
          `
    SELECT a.id AS "no",
    a.pd_code AS "pd_code",
    b.PD_NAME_T AS "part_no",
    b.PD_NAME AS "part_name",
    b.PACKSIZE AS "qty_per_box",
    a.status AS "status"
    FROM (Echutter a JOIN chi_product b)
    WHERE a.pd_code = b.PD_CODE AND timestamp_finish = 0
    ORDER BY a.timestamp_from_sender`
        )
        .catch((err) => console.log(err));
      transform_data = TransformDataEchutteToClient(echutter[0]);

      res.json(transform_data);
    } catch (error) {
      console.log(error);
    }
  } else if (mode_type[0].mode_type === 1) {
    echutter = await sequelize
      .query(
        `
  SELECT a.id AS "no",
  a.pd_code AS "pd_code",
  b.PD_NAME_T AS "part_no",
  b.PD_NAME AS "part_name",
  b.PACKSIZE AS "qty_per_box",
  a.status AS "status"
  FROM (Echutter a JOIN chi_product b)
  WHERE a.pd_code = b.PD_CODE AND timestamp_finish = 0
  ORDER BY a.timestamp_from_sender`
      )
      .catch((err) => console.log(err));
    transform_data = TransformDataEchutteToClient(echutter[0]);
    res.json(transform_data);
  } else {
    echutter = await sequelize
      .query(
        `
  SELECT a.id AS "no",
  a.pd_code AS "pd_code",
  b.PD_NAME_T AS "part_no",
  b.PD_NAME AS "part_name",
  b.PACKSIZE AS "qty_per_box",
  a.status AS "status"
  FROM (Echutter a JOIN chi_product b)
  WHERE a.pd_code = b.PD_CODE AND timestamp_finish = 0
  ORDER BY a.timestamp_from_sender`
      )
      .catch((err) => console.log(err));
    transform_data = TransformDataEchutteToClient(echutter[0]);
    res.json(transform_data);
  }
});

router.post("/", async (req, res) => {
  let echutter = req.body;
  await Echutter.destroy({ truncate: true, cascade: false });
  for (let i = 0; i < 40; i++) {
    echutter.timestamp_from_sender = DateNow();
    echutter.timestamp_finish_work = "0";
    await Echutter.create(echutter);
  }
  res.json(echutter);
});
router.post("/good", async (req, res) => {
  /* รับ Good เข้า */
  /* หาว่าตอนนี้อยู่ในช่วงเวลาไหน ถ้าไม่เจอให้แสดงเวลายังไม่อัพเดท*/
  /*  ถ้าเจอให้ไปรวมงานที่ผ่านมาทั้งหมดตั้งแต่ต้นของแผนงาน >= งานจนถึงปัจจุบันแต่ให้ลบจำนวน plan_per_hours ของเวลาปัจจุบัน === จริง*/
  /* จริงให้บันทึกปกติ ไม่จริงให้บันทึก ดีเลย์ */
  /* เวลาเปรียบเทียบด้วย Unix Time UTC*/
  /* let date_plan = await PerformanceSheetData.findOne({ attributes: ["date"] });
  date_plan = new Date(
    parseInt(date_plan.date.split("-")[0]),
    parseInt(date_plan.date.split("-")[1]),
    parseInt(date_plan.date.split("-")[2])
  ).getTime(); */
  let date_plan = await PerformanceSheetProductionTime.findAll({
    attributes: ["time_start", "time_end"],
  });
  var date_now = new Date().getTime();
  /* จะเช็คเมื่อเวลา date_start <= date_now  และ date_now < date_end เท่านั้นห้ามเท่ากับ */
  let find_index_between_time = date_plan.findIndex((item) => {
    date_start = new Date(item.time_start).getTime();
    date_end = new Date(item.time_end).getTime();
    //console.log(date_start, ">=", date_now, "&&", date_now, "<", date_end);
    //console.log(date_start <= date_now && date_now < date_end);
    return date_start <= date_now && date_now < date_end;
  });
  //console.log(find_index_between_time);
  if (find_index_between_time === -1) res.json({ message: "Date has to update!" });
  //console.log(new Date(date_plan[0].time_start).getTime());
  let sum_actual_per_hours_until_now = await Echutter.count({
    where: {
      timestamp_finish: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[0].time_start).getTime(),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end).getTime(),
        },
      },
    },
  });

  let sum_plan_per_hours_until_now = await PerformanceSheetProductionTime.sum("plan_per_hours", {
    where: {
      time_start: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[0].time_start),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end),
        },
      },
    },
  });

  let plan_per_hours_now = await PerformanceSheetProductionTime.findOne({
    attributes: ["plan_per_hours"],
    where: {
      time_start: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[find_index_between_time].time_start),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end),
        },
      },
    },
  });
  /*  ถ้าเจอให้ไปรวมงานที่ผ่านมาทั้งหมดตั้งแต่ต้นของแผนงาน >= แผนงานจนถึงปัจจุบันแต่ให้ลบจำนวน plan_per_hours ของเวลาปัจจุบัน === จริง*/
  if (sum_actual_per_hours_until_now >= sum_plan_per_hours_until_now - plan_per_hours_now.plan_per_hours == true) {
    //console.log("ไม่ดีเลย์");
    lastest = await Echutter.findOne({
      where: {
        status: 0,
      },
      limit: 1,
    });
    await StoreSideLine.increment("kanban_actual", { by: 1, where: { pd_code: lastest.pd_code } }).catch((err) => console.log(err));
    await Echutter.update(
      { timestamp_finish: DateNow(), status: 1 }, //Complete
      {
        where: {
          status: 0,
        },
        limit: 1,
        raw: true,
      }
    );
  } else {
    //console.log("ดีเลย์");
    lastest = await Echutter.findOne({
      where: {
        status: 0,
      },
      limit: 1,
      raw: true,
    });
    await StoreSideLine.increment("kanban_actual", { by: 1, where: { pd_code: lastest.pd_code } }).catch((err) => console.log(err));
    await Echutter.update(
      { timestamp_finish: DateNow(), status: 2 }, //Delay
      {
        where: {
          status: 0,
        },
        limit: 1,
      }
    );
  }
  sum_actual_per_hours_until_now = await Echutter.count({
    where: {
      timestamp_finish: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[0].time_start).getTime(),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end).getTime(),
        },
      },
    },
  });
  //console.log(sum_actual_per_hours_until_now);
  //console.log(sum_plan_per_hours_until_now);
  //console.log(plan_per_hours_now.plan_per_hours);
  //commandUpdateStoreSideLine = `UPDATE sl_as_count SET count_q=count_q+1,LAST_UPD=NOW() WHERE pd_code = ?`;
  //console.log(date_plan);
  //await sequelize.query("UPDATE ");
  //await Echutter.update({ timestamp_finish_work: DateNow() }, { limit: 1 });

  //res.json(date_plan);
  res.json({ message: "Send Good Success!" });
});

router.post("/nongood", async (req, res) => {
  /* รับ nonGood เข้า */
  /* หาว่าตอนนี้อยู่ในช่วงเวลาไหน ถ้าไม่เจอให้แสดงเวลายังไม่อัพเดท*/
  /*  ถ้าเจอให้ไปรวมงานที่ผ่านมาทั้งหมดตั้งแต่ต้นของแผนงาน >= งานจนถึงปัจจุบันแต่ให้ลบจำนวน plan_per_hours ของเวลาปัจจุบัน === จริง*/
  /* จริงให้บันทึกปกติ ไม่จริงให้บันทึก ดีเลย์ */
  /* เวลาเปรียบเทียบด้วย Unix Time UTC*/
  /* let date_plan = await PerformanceSheetData.findOne({ attributes: ["date"] });
  date_plan = new Date(
    parseInt(date_plan.date.split("-")[0]),
    parseInt(date_plan.date.split("-")[1]),
    parseInt(date_plan.date.split("-")[2])
  ).getTime(); */
  let date_plan = await PerformanceSheetProductionTime.findAll({
    attributes: ["time_start", "time_end"],
  });
  var date_now = new Date().getTime();
  /* จะเช็คเมื่อเวลา date_start <= date_now  และ date_now < date_end เท่านั้นห้ามเท่ากับ */
  let find_index_between_time = date_plan.findIndex((item) => {
    date_start = new Date(item.time_start).getTime();
    date_end = new Date(item.time_end).getTime();
    //console.log(date_start, ">=", date_now, "&&", date_now, "<", date_end);
    //console.log(date_start <= date_now && date_now < date_end);
    return date_start <= date_now && date_now < date_end;
  });
  //console.log(find_index_between_time);
  if (find_index_between_time === -1) res.json({ message: "Date has to update!" });
  //console.log(new Date(date_plan[0].time_start).getTime());
  let sum_actual_per_hours_until_now = await Echutter.count({
    where: {
      timestamp_finish: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[0].time_start).getTime(),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end).getTime(),
        },
      },
    },
  });

  let sum_plan_per_hours_until_now = await PerformanceSheetProductionTime.sum("plan_per_hours", {
    where: {
      time_start: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[0].time_start),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end),
        },
      },
    },
  });

  let plan_per_hours_now = await PerformanceSheetProductionTime.findOne({
    attributes: ["plan_per_hours"],
    where: {
      time_start: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[find_index_between_time].time_start),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end),
        },
      },
    },
  });
  /*  ถ้าเจอให้ไปรวมงานที่ผ่านมาทั้งหมดตั้งแต่ต้นของแผนงาน >= แผนงานจนถึงปัจจุบันแต่ให้ลบจำนวน plan_per_hours ของเวลาปัจจุบัน === จริง*/
  if (sum_actual_per_hours_until_now >= sum_plan_per_hours_until_now - plan_per_hours_now.plan_per_hours == true) {
    //console.log("ไม่ดีเลย์");
    await Echutter.update(
      { timestamp_finish: DateNow(), status: 3, error_code: req.body.error_code }, //Error
      {
        where: {
          status: 0,
        },
        limit: 1,
      }
    );
  } else {
    //console.log("ดีเลย์");
    await Echutter.update(
      { timestamp_finish: DateNow(), status: 4, error_code: req.body.error_code }, //Error+Delay
      {
        where: {
          status: 0,
        },
        limit: 1,
      }
    );
  }
  sum_actual_per_hours_until_now = await Echutter.count({
    where: {
      timestamp_finish: {
        [Op.and]: {
          [Op.gte]: new Date(date_plan[0].time_start).getTime(),
          [Op.lt]: new Date(date_plan[find_index_between_time].time_end).getTime(),
        },
      },
    },
  });
  //console.log(sum_actual_per_hours_until_now);
  //console.log(sum_plan_per_hours_until_now);
  //console.log(plan_per_hours_now.plan_per_hours);
  //commandUpdateStoreSideLine = `UPDATE sl_as_count SET count_q=count_q+1,LAST_UPD=NOW() WHERE pd_code = ?`;
  //console.log(date_plan);
  //await sequelize.query("UPDATE ");
  //await Echutter.update({ timestamp_finish_work: DateNow() }, { limit: 1 });

  //res.json(date_plan);
  res.json({ message: "Send Non Good Success!" });
});
module.exports = router;
