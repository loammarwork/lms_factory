/** @format */

import { Host } from "../Config/env";

const getProductHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "product");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getProductFindHttp = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + `product?keyword=${keyword}`);
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getProductInStoreSideLineHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "product/instoresideline");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getProductFindInStoreSideLineHttp = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + `product/instoresideline?keyword=${keyword}`);
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export { getProductHttp, getProductFindHttp, getProductFindInStoreSideLineHttp, getProductInStoreSideLineHttp };
