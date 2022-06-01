/** @format */

const express = require("express");
const router = express.Router();

const { PerformanceSheetProductionTime, PerformanceSheetData, sequelize } = require("../models");
const TransformDataToPerformanceAnalysisBoard = require("../utils/TransformDataToPerformanceAnalysisBoard");
router.get("/", async (req, res) => {
  try {
    let date_plan = await PerformanceSheetProductionTime.findAll({
      attributes: ["time_start", "time_end"],
    });
    var date_now = new Date().getTime();
    /* จะเช็คเมื่อเวลา date_start >= date_now  และ date_now < date_end เท่านั้นห้ามเท่ากับ */
    let find_index_between_time = date_plan.findIndex((item) => {
      date_start = new Date(item.time_start).getTime();
      date_end = new Date(item.time_end).getTime();
      return date_start <= date_now && date_now < date_end;
    });
    if (find_index_between_time === -1) res.json({ message: "Date has to update!" });
    else {
      try {
        let performanceSheetProductionTime = await sequelize
          .query(
            `SELECT type_shift,
            time_start,
            time_end,
            plan_per_hours,
            (SELECT COUNT(*) FROM Echutter WHERE timestamp_finish/1000 >= UNIX_TIMESTAMP(time_start) AND timestamp_finish/1000 < UNIX_TIMESTAMP(time_end) AND error_code = 0) as actual_per_hours,
            (SELECT COUNT(error_code) FROM Echutter WHERE timestamp_finish/1000 >= UNIX_TIMESTAMP(time_start) AND timestamp_finish/1000 < UNIX_TIMESTAMP(time_end) AND error_code != 0) as defect
            FROM PerformanceSheetProductionTime
            `
          )
          .catch((err) => console.log(err));
        let performanceSheetData = await PerformanceSheetData.findOne({
          attributes: ["std_cycle_time", "normal_working_time", "over_time"],
        });
        let performanceSheetDataAll = TransformDataToPerformanceAnalysisBoard(performanceSheetProductionTime[0], performanceSheetData, find_index_between_time);

        res.json(performanceSheetDataAll);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
