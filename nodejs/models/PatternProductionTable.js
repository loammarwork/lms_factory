/** @format */

module.exports = (sequelize, DataTypes) => {
  const PatternProductionTable = sequelize.define("PatternProductionTable", {
    line: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    machine: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    mo_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    prepare_setup_time: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    setup_time: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    time_period: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    kb_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  PatternProductionTable.associate = (models) => {
    PatternProductionTable.belongsTo(models.chi_product, {
      foreignKey: {
        fieldName: "pd_code",
        allowNull: false,
        require: true,
      },
    });
  };
  return PatternProductionTable;
};
