/** @format */

export const FETCH_START_PRODUCT = "FETCH_START_PRODUCT";
export const FETCH_END_PRODUCT = "FETCH_END_PRODUCT";
export const FETCH_ERROR_PRODUCT = "FETCH_ERROR_PRODUCT";

export function startFetchProduct() {
  return {
    type: FETCH_START_PRODUCT,
  };
}

export function endFetchProduct() {
  return {
    type: FETCH_END_PRODUCT,
  };
}

export function errorFetchProduct(error) {
  return {
    type: FETCH_ERROR_PRODUCT,
    payload: error,
  };
}
