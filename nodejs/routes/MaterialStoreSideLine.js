/** @format */

const express = require("express");
const router = express.Router();
const { MaterialStoreSideLine, sequelize, chi_product } = require("../models");

router.get("/", async (req, res) => {
  try {
    let materialStoreSideLine = await MaterialStoreSideLine.findAll({
      attributes: ["pd_code", "agv_order_per_day", "stock_kanban_min", "stock_kanban_max", "kanban_actual", [sequelize.col("chi_product.PD_NAME"), "part_name"], [sequelize.col("chi_product.PD_NAME_T"), "part_no"], [sequelize.col("chi_product.CUSTOMER"), "customer"], [sequelize.col("chi_product.PACKSIZE"), "unit_kanban"], "location"],
      raw: true,
      include: [
        {
          model: chi_product,
          attributes: [],
        },
      ],
    });
    res.json(materialStoreSideLine);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    await MaterialStoreSideLine.destroy({ truncate: true, cascade: false });
    let materialStoreSideLine = req.body;
    for (let i = 0; i < materialStoreSideLine.length; i++) {
      try {
        await MaterialStoreSideLine.create(materialStoreSideLine[i]).catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
    res.json({ message: "Update Material Store Side Line Successful!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/insertone", async (req, res) => {
  let materialStoreSideLine = req.body;
  materialStoreSideLine.agv_order_per_day = 0;
  materialStoreSideLine.stock_kanban_min = 0;
  materialStoreSideLine.stock_kanban_max = 0;
  materialStoreSideLine.kanban_actual = 0;
  materialStoreSideLine.location = Math.random().toString();
  try {
    await MaterialStoreSideLine.create(materialStoreSideLine);
    res.json({ message: "Add Material Store Side Line Successful!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteone", async (req, res) => {
  console.log(req.body.pd_code);
  try {
    await MaterialStoreSideLine.destroy({ where: { pd_code: req.body.pd_code } });
    res.json({ message: "Delete Material Store Side Line Successful!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/forfillpart", async (req, res) => {
  let materialStoreSideLine = await MaterialStoreSideLine.findAll({ attributes: ["pd_code", "stock_kanban_max", "kanban_actual", "location"] });
  let transformData = [];
  for (let i = 0; i < materialStoreSideLine.length; i++) {
    transformData.push({ pd_code: materialStoreSideLine[i].dataValues.pd_code, want_to_fill: materialStoreSideLine[i].dataValues.stock_kanban_max - materialStoreSideLine[i].dataValues.kanban_actual, location: materialStoreSideLine[i].dataValues.location });
  }
  res.json(transformData);
});

router.post("/fillpart", async (req, res) => {
  try {
    await MaterialStoreSideLine.increment("kanban_actual", { by: req.body.amount, where: { pd_code: req.body.pd_code } });
    res.json({ message: `${req.body.pd_code} add amount ${req.body.amount}!!` });
  } catch (error) {
    console.log(error);
  }
});

router.post("/usepart", async (req, res) => {
  try {
    await MaterialStoreSideLine.decrement("kanban_actual", { by: req.body.amount, where: { pd_code: req.body.pd_code } });
    res.json({ message: `${req.body.pd_code} used amount ${req.body.amount}!!` });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
