/** @format */

import { GET_INSTRUCTION } from "../Actions/instructionAction";

const initialState = { image_name: null };

export function instructionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INSTRUCTION:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
