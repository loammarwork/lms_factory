const res = require("express/lib/response");
/* 
type_process:string,
time:string,
plan_per_hours:number,
plan_per_hours_collect:number,
actual_per_hours:number,
actual_per_hours_collect:number,
percent_actual_workload:number,//float or double
percent_on_process:number,//float or double
defect:number,
percent_defect:number//float or double
delay:number,
total_diff:number
percent_oa_collect:number//float or double ((item.collectActual / totalWorkingTime) * 60 * 60) /
            defaultSetting.STDCycleTime,*/
module.exports = (
  performanceSheetProductionTime,
  performanceSheetData,
  index_between_time
) => {
  const { std_cycle_time, normal_working_time, over_time } =
    performanceSheetData;
  let oa_divider =
    ((normal_working_time + over_time) * 60 * 60) / std_cycle_time;
  let plan_per_hours_sum = 0; //
  let actual_per_hours_sum = 0; //
  for (let i = 0; i < performanceSheetProductionTime.length; i++) {
    plan_per_hours_sum += performanceSheetProductionTime[i].plan_per_hours;
    actual_per_hours_sum += performanceSheetProductionTime[i].actual_per_hours;
  }
  let break_flag = 0;
  let delay_flag = true;
  let index = 0;
  let plan_per_hours_collect = 0; //
  let actual_per_hours_collect = 0; //
  let percent_actual_workload = 0;
  let percent_on_process = 0;
  let defect = 0;
  let percent_defect = 0;
  let percent_defect_sum = 0;
  let delay = 0;
  let delay_sum = 0;
  let total_diff = 0;
  let total_diff_sum = 0;
  let percent_oa_collect = 0;
  let percent_oa_collect_sum = 0;
  let first_shift = performanceSheetProductionTime
    .filter((item) => {
      return item.type_shift === "first_shift";
    })
    .map((item) => {
      if (break_flag !== 2) {
        if (item.plan_per_hours === 0) {
          type_process = "Break";
          break_flag++;
        } else {
          type_process = "Working Time";
        }
      } else {
        if (item.plan_per_hours === 0) {
          type_process = "Break";
          break_flag++;
        } else {
          type_process = "OT";
        }
      }
      if (index >= index_between_time) delay_flag = false;
      index++;

      plan_per_hours_collect += item.plan_per_hours;
      actual_per_hours_collect += item.actual_per_hours;
      percent_actual_workload =
        (actual_per_hours_collect * 100) / plan_per_hours_sum;
      percent_on_process =
        100 - (actual_per_hours_collect * 100) / plan_per_hours_sum;
      defect += item.defect;
      percent_defect =
        item.defect / item.plan_per_hours === 0 ? 0 : item.plan_per_hours;
      percent_defect_sum += percent_defect;
      delay =
        delay_flag === false
          ? 0
          : item.plan_per_hours - item.actual_per_hours + item.defect;
      delay_sum += delay;
      total_diff = percent_defect + delay + item.defect;
      total_diff_sum += total_diff;
      percent_oa_collect =
        item.actual_per_hours == 0
          ? 0
          : ((item.actual_per_hours / (normal_working_time + over_time)) *
              60 *
              60) /
            std_cycle_time;
      percent_oa_collect_sum += percent_oa_collect;
      return {
        type_process: type_process,
        time:
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_start).getHours())
              .getHours()
              .toString()
          ).slice(-2) +
          ":" +
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_start).getMinutes())
              .getMinutes()
              .toString()
          ).slice(-2) +
          "-" +
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_end).getHours())
              .getHours()
              .toString()
          ).slice(-2) +
          ":" +
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_end).getMinutes())
              .getMinutes()
              .toString()
          ).slice(-2),
        plan_per_hours: item.plan_per_hours,
        plan_per_hours_collect: plan_per_hours_collect,
        actual_per_hours: item.actual_per_hours,
        actual_per_hours_collect: actual_per_hours_collect,
        percent_actual_workload: percent_actual_workload,
        percent_on_process: percent_on_process,
        defect: item.defect,
        percent_defect: percent_defect,
        delay: delay,
        total_diff: total_diff,
        percent_oa_collect: percent_oa_collect,
      };
    });

  break_flag = 0;
  let second_shift = performanceSheetProductionTime
    .filter((item) => {
      return item.type_shift === "second_shift";
    })
    .map((item) => {
      if (break_flag !== 2) {
        if (item.plan_per_hours === 0) {
          type_process = "Break";
          break_flag++;
        } else {
          type_process = "Working Time";
        }
      } else {
        if (item.plan_per_hours === 0) {
          type_process = "Break";
          break_flag++;
        } else {
          type_process = "OT";
        }
      }
      if (index >= index_between_time) delay_flag = false;
      index++;

      plan_per_hours_collect += item.plan_per_hours;
      actual_per_hours_collect += item.actual_per_hours;
      percent_actual_workload =
        (actual_per_hours_collect * 100) / plan_per_hours_sum;
      percent_on_process =
        100 - (actual_per_hours_collect * 100) / plan_per_hours_sum;
      defect += item.defect;
      percent_defect =
        item.defect / item.plan_per_hours === 0 ? 0 : item.plan_per_hours;
      percent_defect_sum += percent_defect;
      delay =
        delay_flag === false
          ? 0
          : item.plan_per_hours - item.actual_per_hours + item.defect;
      delay_sum += delay;
      total_diff = percent_defect + delay + item.defect;
      total_diff_sum += total_diff;
      percent_oa_collect =
        item.actual_per_hours == 0
          ? 0
          : ((item.actual_per_hours / (normal_working_time + over_time)) *
              60 *
              60) /
            std_cycle_time;
      percent_oa_collect_sum += percent_oa_collect;

      return {
        type_process: type_process,
        time:
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_start).getHours())
              .getHours()
              .toString()
          ).slice(-2) +
          ":" +
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_start).getMinutes())
              .getMinutes()
              .toString()
          ).slice(-2) +
          "-" +
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_end).getHours())
              .getHours()
              .toString()
          ).slice(-2) +
          ":" +
          (
            "0" +
            new Date(1970, 0, 1, new Date(item.time_end).getMinutes())
              .getMinutes()
              .toString()
          ).slice(-2),
        plan_per_hours: item.plan_per_hours,
        plan_per_hours_collect: plan_per_hours_collect,
        actual_per_hours: item.actual_per_hours,
        actual_per_hours_collect: actual_per_hours_collect,
        percent_actual_workload: percent_actual_workload,
        percent_on_process: percent_on_process,
        defect: item.defect,
        percent_defect: percent_defect,
        delay: delay,
        total_diff: total_diff,
        percent_oa_collect: percent_oa_collect,
      };
    });

  return {
    first_shift,
    second_shift,
    total: {
      plan_per_hours_sum,
      plan_per_hours_collect_sum: plan_per_hours_collect,
      actual_per_hours_sum,
      actual_per_hours_collect_sum: actual_per_hours_collect,
      percent_actual_workload_sum: percent_actual_workload,
      percent_on_process_sum: percent_on_process,
      defect_sum: defect,
      percent_defect_sum,
      delay_sum,
      total_diff_sum,
      percent_oa_collect_sum,
    },
  };
};
