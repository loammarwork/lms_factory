/** @format */

import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect } from "react";
import { fetchParetoChartAsync } from "../Actions/paretoChartAction";
Chart.register(CategoryScale);
const ParetoChart = (props) => {
  const paretoChart = useSelector((state) => state.paretoChart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchParetoChartAsync());
  }, [dispatch]);
  return (
    <div className="chart" style={props.style}>
      <Bar
        data={paretoChart.chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Problem Error",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Code Error",
              },
            },
            y: {
              title: {
                display: true,
                text: "Amount",
              },
              min: 0,
              ticks: {
                stepSize: 1,
              },
            },
            percentage: {
              beginAtZero: true,
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value, index, values) {
                  let findMax = 0;
                  for (let key in values) {
                    if (findMax < values[key].value) findMax = values[key].value;
                  }

                  return `${((value * 100) / findMax).toFixed(0)} %`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
export default ParetoChart;
