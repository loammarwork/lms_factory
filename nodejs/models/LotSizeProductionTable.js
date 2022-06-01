/** @format */

module.exports = (sequelize, DataTypes) => {
  const LotSizeProductionTable = sequelize.define("LotSizeProductionTable", {
    lotsize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    kb_collection: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  LotSizeProductionTable.associate = (models) => {
    LotSizeProductionTable.belongsTo(models.chi_product, {
      foreignKey: {
        fieldName: "pd_code",
        allowNull: false,
        require: true,
      },
    });
  };
  return LotSizeProductionTable;
};
