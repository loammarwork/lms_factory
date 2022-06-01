module.exports = (performanceSheetData, performanceSheetProductionTime) => {
  let first_shift = performanceSheetProductionTime
    .filter((item) => {
      return item.type_shift === "first_shift";
    })
    .map((item) => {
      return {
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
      };
    });

  let second_shift = performanceSheetProductionTime
    .filter((item) => {
      return item.type_shift === "second_shift";
    })
    .map((item) => {
      return {
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
      };
    });

  performanceSheetData = { ...performanceSheetData.dataValues };
  performanceSheetData["first_shift"] = first_shift;
  performanceSheetData["second_shift"] = second_shift;
  return performanceSheetData;
};
