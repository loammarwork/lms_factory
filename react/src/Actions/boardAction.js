/** @format */
import { PerformanceAnalysisBoardHttp } from "../Http/PerformanceAnalysisHttp";
import { startFetchBoard, endFetchBoard, errorFetchBoard } from "./boardStatusAction";
export const UPDATE_BOARD_DATA = "UPDATE_BOARD_DATA";

export function updateBoardData(data) {
  return {
    type: UPDATE_BOARD_DATA,
    payload: data,
  };
}

export function fetchBoardAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchBoard());
      let data = await PerformanceAnalysisBoardHttp();
      if (data) {
        dispatch(updateBoardData(data));
        dispatch(errorFetchBoard(""));
        dispatch(endFetchBoard());
      }
    } catch (error) {
      dispatch(
        updateBoardData({
          first_shift: [],
          second_shift: [],
          total: {},
        })
      );
      dispatch(errorFetchBoard(error));
      dispatch(endFetchBoard());
    }
  };
}
