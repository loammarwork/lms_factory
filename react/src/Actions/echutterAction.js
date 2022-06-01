/** @format */

import { getEchutterHttp } from "../Http/EchutterHttp";
import { endFetchEchutter, errorFetchEchutter, startFetchEchutter } from "./echutterStatusAction";

export const GET_ECHUTTER = "GET_ECHUTTER";

export function getEchutter(data) {
  return {
    type: GET_ECHUTTER,
    payload: data,
  };
}

export function fetchEchutterAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchEchutter());
      let data = await getEchutterHttp();
      if (data) {
        dispatch(getEchutter(data));
        dispatch(errorFetchEchutter(""));
        dispatch(endFetchEchutter());
      }
    } catch (error) {
      dispatch(
        getEchutter([
          {
            no: 0,
            pd_code: "wait",
            part_no: "wait",
            part_name: "wait",
            qty_per_box: 0,
            status: "wait",
          },
        ])
      );
      dispatch(errorFetchEchutter(error));
      dispatch(endFetchEchutter());
    }
  };
}
