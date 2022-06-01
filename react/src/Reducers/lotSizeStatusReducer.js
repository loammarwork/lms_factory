/** @format */
import { FETCH_START_LOTSIZE, FETCH_END_LOTSIZE, FETCH_ERROR_LOTSIZE } from "../Actions/lotSizeStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function lotSizeStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_LOTSIZE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_LOTSIZE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_LOTSIZE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
