/** @format */

import { getLotSizeHttp } from "../Http/LotSizeHttp";
import { endFetchLotSize, errorFetchLotSize, startFetchLotSize } from "./lotSizeStatusAction";

export const GET_LOTSIZE = "GET_LOTSIZE";

export function getLotSize(data) {
  return {
    type: GET_LOTSIZE,
    payload: data,
  };
}

export function fetchLotSizeAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchLotSize());
      let data = await getLotSizeHttp();
      if (data) {
        dispatch(getLotSize(data));
        dispatch(errorFetchLotSize(""));
        dispatch(endFetchLotSize());
      }
    } catch (error) {
      dispatch(
        getLotSize([
          {
            pd_code: "loading...",
            lotsize: 0,
            kb_collection: 0,
            part_name: "loading...",
            part_no: "loading...",
            unit_kanban: 0,
          },
        ])
      );
      dispatch(errorFetchLotSize(error));
      dispatch(endFetchLotSize());
    }
  };
}
