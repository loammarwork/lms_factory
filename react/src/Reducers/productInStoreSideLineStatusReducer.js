/** @format */
import { FETCH_START_PRODUCTINSTORESIDELINE, FETCH_END_PRODUCTINSTORESIDELINE, FETCH_ERROR_PRODUCTINSTORESIDELINE } from "../Actions/productInStoreSideLineStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function productInStoreSideLineStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_PRODUCTINSTORESIDELINE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_PRODUCTINSTORESIDELINE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_PRODUCTINSTORESIDELINE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
