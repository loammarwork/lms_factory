/** @format */

import { UPDATE_PRODUCTINSTORESIDELINE_DATA } from "../Actions/productInStoreSideLineAction";

const initialState = [
  {
    pd_code: "",
    barcode_c: "",
    part_name: "",
    part_no: "",
    part_code: "",
    model: "",
    customer: "",
  },
];

export function productInStoreSideLineReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTINSTORESIDELINE_DATA:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
