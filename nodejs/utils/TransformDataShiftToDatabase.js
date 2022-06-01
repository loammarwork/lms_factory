module.exports = (first_shift, second_shift, date) => {
  let transformData = [];
  let year = parseInt(date.split("-")[0]);
  let month = parseInt(date.split("-")[1]) - 1;
  let day = parseInt(date.split("-")[2]);

  for (let i = 0; i < first_shift.length; i++) {
    transformData.push({
      type_shift: "first_shift",
      time_start: first_shift[i].time.split("-")[0],
      time_end: first_shift[i].time.split("-")[1],
      plan_per_hours: first_shift[i].plan_per_hours,
    });
  }
  for (let i = 0; i < second_shift.length; i++) {
    transformData.push({
      type_shift: "second_shift",
      time_start: second_shift[i].time.split("-")[0],
      time_end: second_shift[i].time.split("-")[1],
      plan_per_hours: second_shift[i].plan_per_hours,
    });
  }

  transformData = transformData.map((data, index) => {
    first_time = new Date(
      1970,
      0,
      1,
      parseInt(transformData[0].time_start.split(":")[0]),
      parseInt(transformData[0].time_start.split(":")[1])
    ).getTime();
    in_array_time_start = new Date(
      1970,
      0,
      1,
      parseInt(data.time_start.split(":")[0]),
      parseInt(data.time_start.split(":")[1])
    ).getTime();
    in_array_time_end = new Date(
      1970,
      0,
      1,
      parseInt(data.time_end.split(":")[0]),
      parseInt(data.time_end.split(":")[1])
    ).getTime();

    if (in_array_time_end !== first_time) {
      return {
        ...data,
        time_start:
          in_array_time_start < first_time
            ? (parseInt(data.time_start.split(":")[0]) + 24).toString() +
              ":" +
              parseInt(data.time_start.split(":")[1])
            : data.time_start,
        time_end:
          in_array_time_end < first_time
            ? (parseInt(data.time_end.split(":")[0]) + 24).toString() +
              ":" +
              parseInt(data.time_end.split(":")[1])
            : data.time_end,
      };
    } else {
      return {
        ...data,
        time_start:
          in_array_time_start < first_time
            ? (parseInt(data.time_start.split(":")[0]) + 24).toString() +
              ":" +
              parseInt(data.time_start.split(":")[1])
            : data.time_start,
        time_end:
          (parseInt(data.time_end.split(":")[0]) + 24).toString() +
          ":" +
          parseInt(data.time_end.split(":")[1]),
      };
    }
  });
  transformData = transformData.map((data) => {
    time_start_hour = parseInt(data.time_start.split(":")[0]);
    time_start_minute = parseInt(data.time_start.split(":")[1]);
    time_end_hour = parseInt(data.time_end.split(":")[0]);
    time_end_minute = parseInt(data.time_end.split(":")[1]);
    return {
      ...data,
      time_start: new Date(
        year,
        month,
        day,
        time_start_hour,
        time_start_minute
      ),
      time_end: new Date(year, month, day, time_end_hour, time_end_minute),
    };
  });
  return transformData;
};
