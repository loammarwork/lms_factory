/** @format */

module.exports = (sequelize, DataTypes) => {
  const MaterialStoreSideLine = sequelize.define("MaterialStoreSideLine", {
    agv_order_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock_kanban_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock_kanban_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    kanban_actual: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "",
    },
  });
  MaterialStoreSideLine.associate = (models) => {
    MaterialStoreSideLine.belongsTo(models.chi_product, {
      foreignKey: {
        fieldName: "pd_code",
        allowNull: false,
        require: true,
      },
    });
  };
  return MaterialStoreSideLine;
};
