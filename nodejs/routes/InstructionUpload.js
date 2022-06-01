/** @format */

const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { InstructionUpload } = require("../models");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./instruction");
  },
  filename: (req, file, cb) => {
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    const fs = require("fs");
    const path = require("path");
    const directory = "./instruction";
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
      cb(null, file.originalname + "_" + `${year}-${month}-${day}-${hour}-${minute}-${second}` + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    });
    //cb(null, file.originalname + "_" + `${year}-${month}-${day}-${hour}-${minute}-${second}` + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});
const upload = multer({ storage: storage });
router.get("/getimage", (req, res) => {
  const folder = "./instruction";
  const fs = require("fs");

  fs.readdir(folder, (err, files) => {
    if (files.length > 0) {
      res.send({ image_name: files[0] });
    } else {
      res.send({ image_name: null });
    }
  });
});
router.post("/", upload.single("file"), async (req, res) => {
  res.json({ message: "File Uploaded!" });
});
router.get("/", async (req, res) => {
  res.json({ message: "Not Avalible" });
});
module.exports = router;
