/** @format */
import { FETCH_START_PATTERN, FETCH_END_PATTERN, FETCH_ERROR_PATTERN } from "../Actions/patternStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function patternStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_PATTERN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_PATTERN:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_PATTERN:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
