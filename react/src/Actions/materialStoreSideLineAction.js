/** @format */

import { getMaterialStoreSideLineHttp } from "../Http/MaterialStoreSideLineHttp";
import { endFetchMaterialStoreSideLine, errorFetchMaterialStoreSideLine, startFetchMaterialStoreSideLine } from "./materialStoreSideLineStatusAction";

export const GET_MATERIAL_STORE_SIDE_LINE = "GET_MATERIAL_STORE_SIDE_LINE";

export function getMaterialStoreSideLine(data) {
  return {
    type: GET_MATERIAL_STORE_SIDE_LINE,
    payload: data,
  };
}

export function fetchMaterialStoreSideLineAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchMaterialStoreSideLine());
      let data = await getMaterialStoreSideLineHttp();
      if (data) {
        dispatch(getMaterialStoreSideLine(data));
        dispatch(errorFetchMaterialStoreSideLine(""));
        dispatch(endFetchMaterialStoreSideLine());
      }
    } catch (error) {
      dispatch(
        getMaterialStoreSideLine([
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
      dispatch(errorFetchMaterialStoreSideLine(error));
      dispatch(endFetchMaterialStoreSideLine());
    }
  };
}
