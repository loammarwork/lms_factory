/** @format */

const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { LotSizeProductionTable, chi_product, sequelize } = require("../models");

router.get("/", async (req, res) => {
  try {
    let lotSize = await LotSizeProductionTable.findAll({
      attributes: ["pd_code", "lotsize", "kb_collection", [sequelize.col("chi_product.PD_NAME"), "part_name"], [sequelize.col("chi_product.PD_NAME_T"), "part_no"], [sequelize.col("chi_product.PACKSIZE"), "unit_kanban"]],
      raw: true,
      include: [
        {
          model: chi_product,
          attributes: [],
        },
      ],
    });
    res.json(lotSize);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    await LotSizeProductionTable.destroy({ truncate: true, cascade: false });
    let lotSizeProductionTable = req.body;
    for (let i = 0; i < lotSizeProductionTable.length; i++) {
      try {
        await LotSizeProductionTable.create(lotSizeProductionTable[i]);
      } catch (error) {
        console.log(error);
      }
    }
    res.json({ message: "Update Lot Size Successful!" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/insertone", async (req, res) => {
  let data = req.body;

  try {
    await LotSizeProductionTable.create(data);
    res.json({ message: "Add Lot Size Success" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteone", async (req, res) => {
  console.log(req.body.pd_code);
  try {
    await LotSizeProductionTable.destroy({ where: { pd_code: req.body.pd_code } });
    res.json({ message: "Delete Lot Size Successful!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
