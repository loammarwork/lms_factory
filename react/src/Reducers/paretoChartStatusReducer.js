/** @format */
import { FETCH_START_PARETOCHART, FETCH_END_PARETOCHART, FETCH_ERROR_PARETOCHART } from "../Actions/paretoChartStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function paretoChartStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_PARETOCHART:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_PARETOCHART:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_PARETOCHART:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
