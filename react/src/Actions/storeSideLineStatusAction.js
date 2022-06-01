/** @format */

export const FETCH_START_STORE_SIDE_LINE = "FETCH_START_STORE_SIDE_LINE";
export const FETCH_END_STORE_SIDE_LINE = "FETCH_END_STORE_SIDE_LINE";
export const FETCH_ERROR_STORE_SIDE_LINE = "FETCH_ERROR_STORE_SIDE_LINE";

export function startFetchStoreSideLine() {
  return {
    type: FETCH_START_STORE_SIDE_LINE,
  };
}

export function endFetchStoreSideLine() {
  return {
    type: FETCH_END_STORE_SIDE_LINE,
  };
}

export function errorFetchStoreSideLine(error) {
  return {
    type: FETCH_ERROR_STORE_SIDE_LINE,
    payload: error,
  };
}
