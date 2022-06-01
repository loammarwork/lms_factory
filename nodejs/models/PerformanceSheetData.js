/** @format */

module.exports = (sequelize, DataTypes) => {
  const PerformanceSheetData = sequelize.define("PerformanceSheetData", {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operator_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    takt_time_line: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    std_cycle_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    normal_working_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    over_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return PerformanceSheetData;
};
