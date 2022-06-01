/** @format */

module.exports = (echutter) => {
  //console.log(echutter);
  transform_data = echutter.map((item, index) => {
    if (index === 0) {
      return { ...item, status: "Running" };
    } else {
      return { ...item, status: "Waiting" };
    }
  });

  return transform_data;
};
