/** @format */
import { getProductHttp, getProductFindHttp } from "../Http/ProductHttp";
import { startFetchProduct, endFetchProduct, errorFetchProduct } from "./productStatusAction";
export const UPDATE_PRODUCT_DATA = "UPDATE_PRODUCT_DATA";

export function updateProductData(data) {
  return {
    type: UPDATE_PRODUCT_DATA,
    payload: data,
  };
}

export function fetchProductAsync() {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchProduct());
      let data = await getProductHttp();
      if (data) {
        dispatch(updateProductData(data));
        dispatch(errorFetchProduct(""));
        dispatch(endFetchProduct());
      }
    } catch (error) {
      dispatch(
        updateProductData({
          pd_code: "loading..",
          barcode_c: "loading..",
          part_name: "loading..",
          part_no: "loading..",
          part_code: "loading..",
          model: "loading..",
          customer: null,
        })
      );
      dispatch(errorFetchProduct(error));
      dispatch(endFetchProduct());
    }
  };
}

export function fetchProductFindAsync(keyword) {
  return async function (dispatch, getState) {
    try {
      dispatch(startFetchProduct());
      let data = await getProductFindHttp(keyword);
      if (data) {
        dispatch(updateProductData(data));
        dispatch(errorFetchProduct(""));
        dispatch(endFetchProduct());
      }
    } catch (error) {
      dispatch(
        updateProductData({
          pd_code: "loading..",
          barcode_c: "loading..",
          part_name: "loading..",
          part_no: "loading..",
          part_code: "loading..",
          model: "loading..",
          customer: null,
        })
      );
      dispatch(errorFetchProduct(error));
      dispatch(endFetchProduct());
    }
  };
}
