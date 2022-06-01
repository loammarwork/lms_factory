/** @format */

module.exports = (sequelize, DataTypes) => {
  const chi_product = sequelize.define(
    "chi_product",
    {
      PD_CODE: {
        type: "varchar(25)",
        allowNull: false,
        primaryKey: true,
      },
      BARCODE: {
        type: "varchar(20)",
        allowNull: false,
      },
      PD_NAME: {
        type: "varchar(120)",
        allowNull: false,
      },
      PD_NAME_T: {
        type: "varchar(120)",
        allowNull: false,
      },
      PD_SHORT_NM: {
        type: "varchar(60)",
        allowNull: false,
      },
      MODEL: {
        type: "varchar(60)",
        allowNull: false,
      },
      UNI_TM: {
        type: "varchar(10)",
        allowNull: false,
      },
      UNI_TM_T: {
        type: "varchar(25)",
        allowNull: false,
      },
      PACKSIZE: {
        type: "int(11)",
        allowNull: false,
      },
      PACKING: {
        type: "varchar(8)",
        allowNull: false,
      },
      STD_COST: {
        type: "float",
        allowNull: false,
      },
      STD_PRICE: {
        type: "float",
        allowNull: false,
      },
      WEIGHT: {
        type: "float",
        allowNull: false,
      },
      SHOT_WG: {
        type: "float",
        allowNull: false,
      },
      WIDTH: {
        type: "float",
        allowNull: false,
      },
      LENGHT: {
        type: "float",
        allowNull: false,
      },
      HEIGHT: {
        type: "float",
        allowNull: false,
      },
      LAST_UPD: {
        type: "datetime",
        allowNull: false,
      },
      CUSTOMER: {
        type: "varchar(45)",
        allowNull: false,
      },
      CRE_BY: {
        type: "varchar(10)",
        allowNull: false,
      },
      PC_CODE: {
        type: "varchar(10)",
        allowNull: false,
      },
    },
    { createdAt: false, updatedAt: false }
  );

  chi_product.associate = (models) => {
    chi_product.hasMany(models.StoreSideLine, {
      as: "chi_product",
      foreignKey: {
        fieldName: "pd_code",
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      constraints: false,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  };

  chi_product.associate = (models) => {
    chi_product.hasMany(models.MaterialStoreSideLine, {
      as: "chi_product",
      foreignKey: {
        fieldName: "pd_code",
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      constraints: false,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  };
  chi_product.associate = (models) => {
    chi_product.hasMany(models.LotSizeProductionTable, {
      as: "chi_product",
      foreignKey: {
        fieldName: "pd_code",
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      constraints: false,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  };
  chi_product.associate = (models) => {
    chi_product.hasMany(models.PatternProductionTable, {
      as: "chi_product",
      foreignKey: {
        fieldName: "pd_code",
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      constraints: false,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  };

  return chi_product;
};
