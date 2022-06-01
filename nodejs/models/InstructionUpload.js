/** @format */

module.exports = (sequelize, DataTypes) => {
  const InstructionUpload = sequelize.define("InstructionUpload", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  });

  return InstructionUpload;
};
