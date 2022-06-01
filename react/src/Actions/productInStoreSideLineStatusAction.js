/** @format */

export const FETCH_START_PRODUCTINSTORESIDELINE = "FETCH_START_PRODUCTINSTORESIDELINE";
export const FETCH_END_PRODUCTINSTORESIDELINE = "FETCH_END_PRODUCTINSTORESIDELINE";
export const FETCH_ERROR_PRODUCTINSTORESIDELINE = "FETCH_ERROR_PRODUCTINSTORESIDELINE";

export function startFetchProductInStoreSideLine() {
  return {
    type: FETCH_START_PRODUCTINSTORESIDELINE,
  };
}

export function endFetchProductInStoreSideLine() {
  return {
    type: FETCH_END_PRODUCTINSTORESIDELINE,
  };
}

export function errorFetchProductInStoreSideLine(error) {
  return {
    type: FETCH_ERROR_PRODUCTINSTORESIDELINE,
    payload: error,
  };
}
