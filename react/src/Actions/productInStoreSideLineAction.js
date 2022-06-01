/** @format */
import { getProductInStoreSideLineHttp, getProductFindInStoreSideLineHttp } from "../Http/ProductHttp";
import { endFetchProductInStoreSideLine, errorFetchProductInStoreSideLine, startFetchProductInStoreSideLine } from "./productInStoreSideLineStatusAction";

export const UPDATE_PRODUCTINSTORESIDELINE_DATA = "UPDATE_PRODUCTINSTORESIDELINE_DATA";

export function updateProductInStoreSideLineData(data) {
  return {
    type: UPDATE_PRODUCTINSTORESIDELINE_DATA,
    payload: data,
  };
}

export function fetchProductInStoreSideLineAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchProductInStoreSideLine());
      let data = await getProductInStoreSideLineHttp();
      if (data) {
        dispatch(updateProductInStoreSideLineData(data));
        dispatch(errorFetchProductInStoreSideLine(""));
        dispatch(endFetchProductInStoreSideLine());
      }
    } catch (error) {
      dispatch(
        updateProductInStoreSideLineData({
          pd_code: "loading..",
          barcode_c: "loading..",
          part_name: "loading..",
          part_no: "loading..",
          part_code: "loading..",
          model: "loading..",
          customer: null,
        })
      );
      dispatch(errorFetchProductInStoreSideLine(error));
      dispatch(endFetchProductInStoreSideLine());
    }
  };
}

export function fetchProductInStoreSideLineFindAsync(keyword) {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchProductInStoreSideLine());
      let data = await getProductFindInStoreSideLineHttp(keyword);
      if (data) {
        dispatch(updateProductInStoreSideLineData(data));
        dispatch(errorFetchProductInStoreSideLine(""));
        dispatch(endFetchProductInStoreSideLine());
      }
    } catch (error) {
      dispatch(
        updateProductInStoreSideLineData({
          pd_code: "loading..",
          barcode_c: "loading..",
          part_name: "loading..",
          part_no: "loading..",
          part_code: "loading..",
          model: "loading..",
          customer: null,
        })
      );
      dispatch(errorFetchProductInStoreSideLine(error));
      dispatch(endFetchProductInStoreSideLine());
    }
  };
}
