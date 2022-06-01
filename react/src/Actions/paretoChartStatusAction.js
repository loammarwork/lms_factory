/** @format */

export const FETCH_START_PARETOCHART = "FETCH_START_PARETOCHART";
export const FETCH_END_PARETOCHART = "FETCH_END_PARETOCHART";
export const FETCH_ERROR_PARETOCHART = "FETCH_ERROR_PARETOCHART";

export function startFetchParetoChart() {
  return {
    type: FETCH_START_PARETOCHART,
  };
}

export function endFetchParetoChart() {
  return {
    type: FETCH_END_PARETOCHART,
  };
}

export function errorFetchParetoChart(error) {
  return {
    type: FETCH_ERROR_PARETOCHART,
    payload: error,
  };
}
