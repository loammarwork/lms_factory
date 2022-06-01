/** @format */

module.exports = (sequelize, DataTypes) => {
  const Echutter = sequelize.define("Echutter", {
    pd_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      /*
        0->Waiting
        1->Complete
        2->Complete+Delay
        3->Error
        4->Error+Delay
      */
    },
    timestamp_from_sender: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    timestamp_finish: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    error_code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
  });
  return Echutter;
};
