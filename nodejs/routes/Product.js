/** @format */

const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { chi_product, StoreSideLine, sequelize } = require("../models");

router.get("/", async (req, res) => {
  console.log(req.query.keyword);
  if (req.query.keyword !== undefined) {
    try {
      let product = await chi_product.findAll({
        attributes: [
          ["PD_CODE", "pd_code"],
          ["BARCODE", "barcode_c"],
          ["PD_NAME", "part_name"],
          ["PD_NAME_T", "part_no"],
          ["PD_SHORT_NM", "part_code"],
          ["MODEL", "model"],
          ["CUSTOMER", "customer"],
        ],
        where: {
          PD_CODE: {
            [Op.like]: `%${req.query.keyword}%`,
          },
        },
      });
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let product = await chi_product.findAll({
        attributes: [
          ["PD_CODE", "pd_code"],
          ["BARCODE", "barcode_c"],
          ["PD_NAME", "part_name"],
          ["PD_NAME_T", "part_no"],
          ["PD_SHORT_NM", "part_code"],
          ["MODEL", "model"],
          ["CUSTOMER", "customer"],
        ],
        limit: 30,
      });
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  }
});
router.get("/instoresideline", async (req, res) => {
  console.log(req.query.keyword);
  if (req.query.keyword !== undefined) {
    try {
      let productInStoreSideLine = await StoreSideLine.findAll({
        attributes: ["pd_code", [sequelize.col("chi_product.BARCODE"), "barcode_c"], [sequelize.col("chi_product.PD_NAME"), "part_name"], [sequelize.col("chi_product.PD_NAME_T"), "part_no"], [sequelize.col("chi_product.PD_SHORT_NM"), "part_code"], [sequelize.col("chi_product.MODEL"), "model"], [sequelize.col("chi_product.CUSTOMER"), "customer"]],
        raw: true,
        include: [
          {
            model: chi_product,
            attributes: [],
          },
        ],
        where: {
          pd_code: "chi_product.PD_CODE",
        },
      });
      res.json(productInStoreSideLine);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let productInStoreSideLine = await StoreSideLine.findAll({
        attributes: ["pd_code", [sequelize.col("chi_product.BARCODE"), "barcode_c"], [sequelize.col("chi_product.PD_NAME"), "part_name"], [sequelize.col("chi_product.PD_NAME_T"), "part_no"], [sequelize.col("chi_product.PD_SHORT_NM"), "part_code"], [sequelize.col("chi_product.MODEL"), "model"], [sequelize.col("chi_product.CUSTOMER"), "customer"]],
        raw: true,
        include: [
          {
            model: chi_product,
            attributes: [],
          },
        ],
      });
      res.json(productInStoreSideLine);
    } catch (error) {
      console.log(error);
    }
  }
});
module.exports = router;
