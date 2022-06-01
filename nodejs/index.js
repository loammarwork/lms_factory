/** @format */

const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/images", express.static(__dirname + "/assets/images"));
app.use("/instruction", express.static(__dirname + "/instruction"));
const db = require("./models");
// Routers

const performanceSheetDataRouter = require("./routes/PerformanceSheetData");
app.use("/performancesheetdata", performanceSheetDataRouter);
const performanceAnalysisBoard = require("./routes/PerformanceAnalysisBoard");
app.use("/performanceanalysisboard", performanceAnalysisBoard);
const StoreSideLine = require("./routes/StoreSideLine");
app.use("/storesideline", StoreSideLine);
const MaterialStoreSideLine = require("./routes/MaterialStoreSideLine");
app.use("/materialstoresideline", MaterialStoreSideLine);
const echutter = require("./routes/Echutter");
app.use("/echutter", echutter);
const product = require("./routes/Product");
app.use("/product", product);
const lotSize = require("./routes/LotSizeProduction");
app.use("/lotsize", lotSize);
const pattern = require("./routes/PatternProduction");
app.use("/pattern", pattern);
const modeType = require("./routes/ModeType");
app.use("/modetype", modeType);
const instruction = require("./routes/InstructionUpload");
app.use("/instruction", instruction);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

db.sequelize.sync().then(() => {
  app.listen(8000, () => console.log("Server run at port 8000"));
});
