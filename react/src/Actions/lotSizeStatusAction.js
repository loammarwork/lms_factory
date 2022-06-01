/** @format */

export const FETCH_START_LOTSIZE = "FETCH_START_LOTSIZE";
export const FETCH_END_LOTSIZE = "FETCH_END_LOTSIZE";
export const FETCH_ERROR_LOTSIZE = "FETCH_ERROR_LOTSIZE";

export function startFetchLotSize() {
  return {
    type: FETCH_START_LOTSIZE,
  };
}

export function endFetchLotSize() {
  return {
    type: FETCH_END_LOTSIZE,
  };
}

export function errorFetchLotSize(error) {
  return {
    type: FETCH_ERROR_LOTSIZE,
    payload: error,
  };
}
