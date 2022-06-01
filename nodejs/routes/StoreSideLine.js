/** @format */

const express = require("express");
const router = express.Router();
const { StoreSideLine, LotSizeProductionTable, sequelize, chi_product, ModeType, Echutter } = require("../models");
function DateNow() {
  return Date.now() + "." + String(process.hrtime()[1]).slice(3, 8);
}
router.get("/", async (req, res) => {
  try {
    let storeSideLine = await StoreSideLine.findAll({
      attributes: ["pd_code", "agv_order_per_day", "stock_kanban_min", "stock_kanban_max", "kanban_actual", [sequelize.col("chi_product.PD_NAME"), "part_name"], [sequelize.col("chi_product.PD_NAME_T"), "part_no"], [sequelize.col("chi_product.CUSTOMER"), "customer"], [sequelize.col("chi_product.PACKSIZE"), "unit_kanban"], "location"],
      raw: true,
      include: [
        {
          model: chi_product,
          attributes: [],
        },
      ],
    });
    res.json(storeSideLine);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await StoreSideLine.destroy({ truncate: true, cascade: false });
    let storeSideLine = req.body;

    for (let i = 0; i < storeSideLine.length; i++) {
      try {
        await StoreSideLine.create(storeSideLine[i]);
      } catch (error) {
        console.log(error);
      }
    }
    res.json({ message: "Update Store Side Line Successful!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/insertone", async (req, res) => {
  let storeSideLine = req.body;
  console.log(req.body);
  storeSideLine.agv_order_per_day = 0;
  storeSideLine.stock_kanban_min = 0;
  storeSideLine.stock_kanban_max = 0;
  storeSideLine.kanban_actual = 0;
  storeSideLine.location = Math.random().toString();
  try {
    await StoreSideLine.create(storeSideLine);
    res.json({ message: "Add Store Side Line Successful!" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/deleteone", async (req, res) => {
  try {
    await StoreSideLine.destroy({ where: { pd_code: req.body.pd_code } });
    res.json({ message: "Delete  Store Side Line Successful!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/forfillpart", async (req, res) => {
  try {
    let storeSideLine = await StoreSideLine.findAll({ attributes: ["pd_code", [sequelize.literal("stock_kanban_max - kanban_actual"), "want_to_fill"], "location"] });
    res.json(storeSideLine);
  } catch (error) {
    console.log(error);
  }
});

router.post("/fillpart", async (req, res) => {
  try {
    await StoreSideLine.increment("kanban_actual", { by: req.body.amount, where: { pd_code: req.body.pd_code } });
    res.json({ message: `${req.body.pd_code} add amount ${req.body.amount}!!` });
  } catch (error) {
    console.log(error);
  }
});

router.post("/usepart", async (req, res) => {
  let mode_type = await ModeType.findAll({ raw: true });
  if (mode_type[0].mode_type === 0) {
    try {
      await StoreSideLine.decrement("kanban_actual", { by: req.body.amount, where: { pd_code: req.body.pd_code } });
      res.json({ message: `${req.body.pd_code} used amount ${req.body.amount}!!` });
    } catch (error) {
      console.log(error);
    }
  } else {
    //check lotsize kb
    try {
      data = await LotSizeProductionTable.findOne({ where: { pd_code: req.body.pd_code }, raw: true });
      console.log(data);
      console.log(data.lotsize - data.kb_collection);
      if (data.lotsize - data.kb_collection === 1) {
        await LotSizeProductionTable.decrement("kb_collection", { by: data.lotsize, where: { pd_code: req.body.pd_code } }).catch((err) => console.log(err));
        await StoreSideLine.decrement("kanban_actual", { by: req.body.amount, where: { pd_code: req.body.pd_code } }).catch((err) => console.log(err));
        await LotSizeProductionTable.increment("kb_collection", { by: req.body.amount, where: { pd_code: req.body.pd_code } }).catch((err) => console.log(err));
        for (let i = 0; i < data.kb_collection + 1; i++) {
          await Echutter.create({ pd_code: req.body.pd_code, timestamp_from_sender: DateNow(), timestamp_finish_work: "0" });
        }
      } else {
        await StoreSideLine.decrement("kanban_actual", { by: req.body.amount, where: { pd_code: req.body.pd_code } }).catch((err) => console.log(err));
        await LotSizeProductionTable.increment("kb_collection", { by: req.body.amount, where: { pd_code: req.body.pd_code } }).catch((err) => console.log(err));
      }

      res.json({ message: `${req.body.pd_code} used amount ${req.body.amount}!!` });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
