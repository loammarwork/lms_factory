/** @format */

const express = require("express");
const router = express.Router();
const { PerformanceSheetData, PerformanceSheetProductionTime } = require("../models");
const TransformDataShiftToDatabase = require("../utils/TransformDataShiftToDatabase");
const TransformDataShiftToClient = require("../utils/TransformDataShiftToClient");
router.get("/", async (_, res) => {
  try {
    let performanceSheetData = await PerformanceSheetData.findOne();
    try {
      let performanceSheetProductionTime = await PerformanceSheetProductionTime.findAll();
      performanceSheetDataAll = TransformDataShiftToClient(performanceSheetData, performanceSheetProductionTime);
      res.json(performanceSheetDataAll);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const first_shift = req.body.first_shift;
  const second_shift = req.body.second_shift;
  delete req.body.first_shift;
  delete req.body.second_shift;
  performanceSheetProductionTime = TransformDataShiftToDatabase(first_shift, second_shift, req.body.date);

  const performanceSheetData = req.body;
  //console.log(performanceSheetData);
  try {
    await PerformanceSheetData.destroy({ truncate: true, cascade: false });
    try {
      await PerformanceSheetProductionTime.destroy({
        truncate: true,
        cascade: false,
      });
      try {
        await PerformanceSheetData.create(performanceSheetData);
        for (let i = 0; i < performanceSheetProductionTime.length; i++) {
          await PerformanceSheetProductionTime.create(performanceSheetProductionTime[i]);
        }
        res.json(performanceSheetProductionTime);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
