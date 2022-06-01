/** @format */
import { FETCH_START_INSTRUCTION, FETCH_END_INSTRUCTION, FETCH_ERROR_INSTRUCTION } from "../Actions/instructionStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function instructionStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_INSTRUCTION:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_INSTRUCTION:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_INSTRUCTION:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
