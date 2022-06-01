/** @format */

export const FETCH_START_INSTRUCTION = "FETCH_START_INSTRUCTION";
export const FETCH_END_INSTRUCTION = "FETCH_END_INSTRUCTION";
export const FETCH_ERROR_INSTRUCTION = "FETCH_ERROR_INSTRUCTION";

export function startFetchInstruction() {
  return {
    type: FETCH_START_INSTRUCTION,
  };
}

export function endFetchInstruction() {
  return {
    type: FETCH_END_INSTRUCTION,
  };
}

export function errorFetchInstruction(error) {
  return {
    type: FETCH_ERROR_INSTRUCTION,
    payload: error,
  };
}
