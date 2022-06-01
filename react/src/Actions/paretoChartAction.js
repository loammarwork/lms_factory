/** @format */
import { getGraphProblem } from "../Http/EchutterHttp";
import { startFetchParetoChart, endFetchParetoChart, errorFetchParetoChart } from "./paretoChartStatusAction";
export const UPDATE_PARETOCHART_DATA = "UPDATE_PARETOCHART_DATA";

export function updateParetoChartData(data) {
  return {
    type: UPDATE_PARETOCHART_DATA,
    payload: data,
  };
}

export function fetchParetoChartAsync() {
  function sortArrays(arrays, comparator = (a, b) => (b < a ? -1 : b > a ? 1 : 0)) {
    let arrayKeys = Object.keys(arrays);
    let sortableArray = Object.values(arrays)[0];
    let indexes = Object.keys(sortableArray);
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

    let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map((sortedIndex) => array[sortedIndex]);

    if (Array.isArray(arrays)) {
      return arrayKeys.map((arrayIndex) => sortByIndexes(arrays[arrayIndex], sortedIndexes));
    } else {
      let sortedArrays = {};
      arrayKeys.forEach((arrayKey) => {
        sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
      });
      return sortedArrays;
    }
  }
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchParetoChart());
      let labels = ["101", "102", "103", "104", "105", "201", "202", "203", "301", "302", "303", "401", "402", "501"];
      let datas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let data = await getGraphProblem();

      for (let i = 0; i < data.length; i++) {
        let index = labels.findIndex((item) => data[i].error_code === item);
        datas[index] = data[i].amount;
      }

      let sortData = sortArrays({ datas, labels });

      if (data) {
        dispatch(updateParetoChartData(sortData));
        dispatch(errorFetchParetoChart(""));
        dispatch(endFetchParetoChart());
      }
    } catch (error) {
      dispatch(
        updateParetoChartData({
          first_shift: [],
          second_shift: [],
          total: {},
        })
      );
      dispatch(errorFetchParetoChart(error));
      dispatch(endFetchParetoChart());
    }
  };
}
