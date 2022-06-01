/** @format */

export const FETCH_START_BOARD = "FETCH_START_BOARD";
export const FETCH_END_BOARD = "FETCH_END_BOARD";
export const FETCH_ERROR_BOARD = "FETCH_ERROR_BOARD";

export function startFetchBoard() {
  return {
    type: FETCH_START_BOARD,
  };
}

export function endFetchBoard() {
  return {
    type: FETCH_END_BOARD,
  };
}

export function errorFetchBoard(error) {
  return {
    type: FETCH_ERROR_BOARD,
    payload: error,
  };
}
