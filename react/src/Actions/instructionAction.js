/** @format */

import { getInstructionHttp } from "../Http/InstructionHttp";
import { endFetchInstruction, errorFetchInstruction, startFetchInstruction } from "./instructionStatusAction";

export const GET_INSTRUCTION = "GET_INSTRUCTION";

export function getInstruction(data) {
  return {
    type: GET_INSTRUCTION,
    payload: data,
  };
}

export function fetchInstructionAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchInstruction());
      let data = await getInstructionHttp();
      if (data) {
        dispatch(getInstruction(data));
        dispatch(errorFetchInstruction(""));
        dispatch(endFetchInstruction());
      }
    } catch (error) {
      dispatch(getInstruction({ image_name: null }));
      dispatch(errorFetchInstruction(error));
      dispatch(endFetchInstruction());
    }
  };
}
