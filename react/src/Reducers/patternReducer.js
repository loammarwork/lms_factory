/** @format */

import { GET_PATTERN } from "../Actions/patternAction";

const initialState = [
  {
    pd_code: "loading...",
    line: 0,
    machine: "loading...",
    mo_id: "loading...",
    prepare_setup_time: "loading...",
    setup_time: "loading...",
    time_period: "loading...",
    part_name: "loading...",
    part_no: "loading...",
    unit_kanban: 0,
  },
];

export function patternReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATTERN:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
