/** @format */
import { FETCH_START_MATERIAL_STORE_SIDE_LINE, FETCH_END_MATERIAL_STORE_SIDE_LINE, FETCH_ERROR_MATERIAL_STORE_SIDE_LINE } from "../Actions/materialStoreSideLineStatusAction";
const initialState = {
  loading: false,
  error: "",
};

export function materialStoreSideLineStatusReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START_MATERIAL_STORE_SIDE_LINE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_END_MATERIAL_STORE_SIDE_LINE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ERROR_MATERIAL_STORE_SIDE_LINE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
