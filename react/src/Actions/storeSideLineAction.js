/** @format */

import { getStoreSideLineHttp } from "../Http/StoreSideLineHttp";
import { endFetchStoreSideLine, errorFetchStoreSideLine, startFetchStoreSideLine } from "./storeSideLineStatusAction";

export const GET_STORE_SIDE_LINE = "GET_STORE_SIDE_LINE";

export function getStoreSideLine(data) {
  return {
    type: GET_STORE_SIDE_LINE,
    payload: data,
  };
}

export function fetchStoreSideLineAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchStoreSideLine());
      let data = await getStoreSideLineHttp();
      if (data) {
        dispatch(getStoreSideLine(data));
        dispatch(errorFetchStoreSideLine(""));
        dispatch(endFetchStoreSideLine());
      }
    } catch (error) {
      dispatch(
        getStoreSideLine([
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
        ])
      );
      dispatch(errorFetchStoreSideLine(error));
      dispatch(endFetchStoreSideLine());
    }
  };
}
