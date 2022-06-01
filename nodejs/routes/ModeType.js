/** @format */

const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { ModeType, Echutter } = require("../models");

router.post("/", async (req, res) => {
  try {
    data = await ModeType.findAll();
    if (data.length === 0) {
      await ModeType.create(req.body);
    } else {
      await ModeType.update({ mode_type: req.body.mode_type }, { where: { id: 1 } });
    }
    try {
      await Echutter.destroy({ truncate: true, cascade: false });
      try {
        data = await ModeType.findAll({ attribute: ["mode_type"] }, { raw: true });

        res.json({ message: `change mode to ${data.mode_type === 0 ? "Kanban By Kanban" : data.mode_type === 1 ? "Lot Size" : "Pattern"}` });
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

router.get("/", async (req, res) => {
  try {
    let data = await ModeType.findAll();
    res.json({ mode_type: `${data[0].dataValues.mode_type === 0 ? "Kanban By Kanban" : data[0].dataValues.mode_type === 1 ? "Lot Size" : "Pattern"}` });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
