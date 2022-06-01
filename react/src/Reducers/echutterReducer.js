/** @format */

import { GET_ECHUTTER } from "../Actions/echutterAction";

const initialState = [
  {
    no: 0,
    pd_code: "wait",
    part_no: "wait",
    part_name: "wait",
    qty_per_box: 0,
    status: "wait",
  },
];

export function echutterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ECHUTTER:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
