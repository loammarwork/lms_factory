/** @format */

export const FETCH_START_ECHUTTER = "FETCH_START_ECHUTTER";
export const FETCH_END_ECHUTTER = "FETCH_END_ECHUTTER";
export const FETCH_ERROR_ECHUTTER = "FETCH_ERROR_ECHUTTER";

export function startFetchEchutter() {
  return {
    type: FETCH_START_ECHUTTER,
  };
}

export function endFetchEchutter() {
  return {
    type: FETCH_END_ECHUTTER,
  };
}

export function errorFetchEchutter(error) {
  return {
    type: FETCH_ERROR_ECHUTTER,
    payload: error,
  };
}
