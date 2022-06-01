/** @format */

import { getPatternHttp } from "../Http/PatternHttp";
import { endFetchPattern, errorFetchPattern, startFetchPattern } from "./patternStatusAction";

export const GET_PATTERN = "GET_PATTERN";

export function getPattern(data) {
  return {
    type: GET_PATTERN,
    payload: data,
  };
}

export function fetchPatternAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchPattern());
      let data = await getPatternHttp();
      if (data) {
        dispatch(getPattern(data));
        dispatch(errorFetchPattern(""));
        dispatch(endFetchPattern());
      }
    } catch (error) {
      dispatch(
        getPattern([
          {
            pd_code: "loading...",
            pattern: 0,
            kb_collection: 0,
            part_name: "loading...",
            part_no: "loading...",
            unit_kanban: 0,
          },
        ])
      );
      dispatch(errorFetchPattern(error));
      dispatch(endFetchPattern());
    }
  };
}
