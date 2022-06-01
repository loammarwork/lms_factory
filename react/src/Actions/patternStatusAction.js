/** @format */

export const FETCH_START_PATTERN = "FETCH_START_PATTERN";
export const FETCH_END_PATTERN = "FETCH_END_PATTERN";
export const FETCH_ERROR_PATTERN = "FETCH_ERROR_PATTERN";

export function startFetchPattern() {
  return {
    type: FETCH_START_PATTERN,
  };
}

export function endFetchPattern() {
  return {
    type: FETCH_END_PATTERN,
  };
}

export function errorFetchPattern(error) {
  return {
    type: FETCH_ERROR_PATTERN,
    payload: error,
  };
}
