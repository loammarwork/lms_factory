/** @format */
import { FETCH_START_ECHUTTER, FETCH_END_ECHUTTER, FETCH_ERROR_ECHUTTER } from "../Actions/echutterStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function echutterStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_ECHUTTER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_ECHUTTER:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_ECHUTTER:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
