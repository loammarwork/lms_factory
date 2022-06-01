/** @format */

module.exports = (sequelize, DataTypes) => {
  const PerformanceSheetProductionTime = sequelize.define("PerformanceSheetProductionTime", {
    type_shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    plan_per_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return PerformanceSheetProductionTime;
};
