/** @format */

import { GET_LOTSIZE } from "../Actions/lotSizeAction";

const initialState = [
  {
    pd_code: "loading...",
    lotsize: 0,
    kb_collection: 0,
    part_name: "loading...",
    part_no: "loading...",
    unit_kanban: 0,
  },
];

export function lotSizeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOTSIZE:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
