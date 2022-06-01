/** @format */

import { UPDATE_PRODUCT_DATA } from "../Actions/productAction";

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

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCT_DATA:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
