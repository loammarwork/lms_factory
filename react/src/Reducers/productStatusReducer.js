/** @format */
import { FETCH_START_PRODUCT, FETCH_END_PRODUCT, FETCH_ERROR_PRODUCT } from "../Actions/productStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function productStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_PRODUCT:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_PRODUCT:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
