/** @format */

const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { PatternProductionTable, chi_product, sequelize } = require("../models");
let schedule = require("../utils/Schedule.utils");
router.get("/", async (req, res) => {
  try {
    let pattern = await PatternProductionTable.findAll({
      attributes: ["pd_code", "line", "machine", "mo_id", "prepare_setup_time", "setup_time", "time_period", "kb_unit", [sequelize.col("chi_product.PD_NAME"), "part_name"], [sequelize.col("chi_product.PD_NAME_T"), "part_no"], [sequelize.col("chi_product.PACKSIZE"), "unit_kanban"]],
      raw: true,
      include: [
        {
          model: chi_product,
          attributes: [],
        },
      ],
    });
    res.json(pattern);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await PatternProductionTable.destroy({ truncate: true, cascade: false });
    let patternProductionTable = req.body;
    for (let i = 0; i < patternProductionTable.length; i++) {
      try {
        await PatternProductionTable.create(patternProductionTable[i]);
      } catch (error) {
        console.log(error);
      }
    }
    schedule.setSchedule();
    res.json({ message: "Update Pattern Successful!" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/insertone", async (req, res) => {
  let data = req.body;
  try {
    await PatternProductionTable.create(data);
    res.json({ message: "Add Pattern Success" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteone", async (req, res) => {
  console.log(req.body.pd_code);
  try {
    await PatternProductionTable.destroy({ where: { pd_code: req.body.pd_code } });
    res.json({ message: "Delete Pattern Successful!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
