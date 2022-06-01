/** @format */

const { PatternProductionTable, chi_product, sequelize, Echutter } = require("../models");
function DateNow() {
  return Date.now() + "." + String(process.hrtime()[1]).slice(3, 8);
}
let Schedule = (module.exports = {
  schedule: require("node-schedule"),
  setSchedule: async () => {
    Schedule.unSetSchedule();
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
    pattern.forEach((item, index) => {
      let start_hour = parseInt(item.time_period.split("-")[0].split(":")[0]);
      let start_minute = parseInt(item.time_period.split("-")[0].split(":")[1]);
      Schedule.schedule.scheduleJob(`work${index}`, { hour: start_hour, minute: start_minute }, async () => {
        try {
          for (let i = 0; i < item.kb_unit; i++) {
            console.log("กำลังอัพเดท........");
            let echutter = {};
            echutter.pd_code = item.pd_code;
            echutter.timestamp_from_sender = DateNow();
            echutter.timestamp_finish_work = "0";
            await Echutter.create(echutter);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
    let jobList = Schedule.schedule.scheduledJobs;
    for (jobName in jobList) {
      console.log(jobName);
    }

    console.log(pattern);
  },
  unSetSchedule: async () => {
    console.log(Object.keys(Schedule.schedule.scheduledJobs).length === 0);
    if (Object.keys(Schedule.schedule.scheduledJobs).length !== 0) {
      let jobList = Schedule.schedule.scheduledJobs;
      for (jobName in jobList) {
        let job = "jobList." + jobName;
        eval(job + ".cancel()");
      }
    }
  },
});
