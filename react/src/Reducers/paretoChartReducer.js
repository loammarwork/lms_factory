/** @format */

import { UPDATE_PARETOCHART_DATA } from "../Actions/paretoChartAction";

const initialState = {
  chartData: {
    labels: ["101", "102", "103", "104", "105", "201", "202", "203", "301", "302", "303", "401", "402", "501"],
    datasets: [
      {
        type: "bar",
        label: "Rainfall",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 0, 0, 0, 0],
        backgroundColor: ["rgba(255,99,132)", "rgba(54,162,132)", "rgba(255,206,132)", "rgba(75,192,132)", "rgba(153,102,132)", "rgba(24,159,132)", "rgba(10,99,132)"],
      },
      {
        type: "line",
        label: "Rainfall",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 0, 0, 0, 0],
        backgroundColor: ["rgba(255,99,132)", "rgba(54,162,132)", "rgba(255,206,132)", "rgba(75,192,132)", "rgba(153,102,132)", "rgba(24,159,132)", "rgba(10,99,132)"],
      },
      {
        yAxisID: "percentage",
        borderWidth: 0,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 0, 0, 0, 0],
      },
    ],
  },
};

export function paretoChartReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PARETOCHART_DATA:
      state = {
        chartData: {
          labels: action.payload.labels,
          datasets: [
            {
              type: "bar",
              label: "Rainfall",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: action.payload.datas,
              backgroundColor: ["rgba(255,99,132)", "rgba(54,162,132)", "rgba(255,206,132)", "rgba(75,192,132)", "rgba(153,102,132)", "rgba(24,159,132)", "rgba(10,99,132)"],
            },
            {
              type: "line",
              label: "Rainfall",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: action.payload.datas,
              backgroundColor: ["rgba(255,99,132)", "rgba(54,162,132)", "rgba(255,206,132)", "rgba(75,192,132)", "rgba(153,102,132)", "rgba(24,159,132)", "rgba(10,99,132)"],
            },
            {
              yAxisID: "percentage",
              borderWidth: 0,
              data: action.payload.datas,
            },
          ],
        },
      };
      return state;
    default:
      return state;
  }
}
