/** @format */

import { GET_STORE_SIDE_LINE } from "../Actions/storeSideLineAction";

const initialState = [
  {
    pd_code: "loading...",
    agv_order_per_day: 0,
    stock_kanban_min: 0,
    stock_kanban_max: 0,
    kanban_actual: 0,
    part_name: "loading...",
    part_no: "loading...",
    customer: "loading...",
    unit_kanban: 0,
  },
];

export function storeSideLineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_SIDE_LINE:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
