/** @format */
import { FETCH_START_STORE_SIDE_LINE, FETCH_END_STORE_SIDE_LINE, FETCH_ERROR_STORE_SIDE_LINE } from "../Actions/storeSideLineStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function storeSideLineStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_STORE_SIDE_LINE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_STORE_SIDE_LINE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_STORE_SIDE_LINE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
