/** @format */

export const FETCH_START_MATERIAL_STORE_SIDE_LINE = "FETCH_START_MATERIAL_STORE_SIDE_LINE";
export const FETCH_END_MATERIAL_STORE_SIDE_LINE = "FETCH_END_MATERIAL_STORE_SIDE_LINE";
export const FETCH_ERROR_MATERIAL_STORE_SIDE_LINE = "FETCH_ERROR_MATERIAL_STORE_SIDE_LINE";

export function startFetchMaterialStoreSideLine() {
  return {
    type: FETCH_START_MATERIAL_STORE_SIDE_LINE,
  };
}

export function endFetchMaterialStoreSideLine() {
  return {
    type: FETCH_END_MATERIAL_STORE_SIDE_LINE,
  };
}

export function errorFetchMaterialStoreSideLine(error) {
  return {
    type: FETCH_ERROR_MATERIAL_STORE_SIDE_LINE,
    payload: error,
  };
}
