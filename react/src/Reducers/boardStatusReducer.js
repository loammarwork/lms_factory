/** @format */
import { FETCH_START_BOARD, FETCH_END_BOARD, FETCH_ERROR_BOARD } from "../Actions/boardStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function boardStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_BOARD:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_BOARD:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_BOARD:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
