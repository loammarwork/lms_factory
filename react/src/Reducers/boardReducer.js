/** @format */

import { UPDATE_BOARD_DATA } from "../Actions/boardAction";

const initialState = {
  first_shift: [],
  second_shift: [],
  total: {},
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BOARD_DATA:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
