/** @format */

module.exports = (sequelize, DataTypes) => {
  const ModeType = sequelize.define("ModeType", {
    mode_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return ModeType;
};
