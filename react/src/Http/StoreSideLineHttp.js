/** @format */

import { Host } from "../Config/env";

const getStoreSideLineHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "storesideline");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("Something Wrong!");
    }
  });
};
const saveStoreSideLineOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "storesideline/insertone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pd_code: pd_code }),
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("Something Wrong!");
    }
  });
};

const saveStoreSideLineManyHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "storesideline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json_data),
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("Something Wrong!");
    }
  });
};

const deleteStoreSideLineOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "storesideline/deleteone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pd_code: pd_code }),
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("Something Wrong!");
    }
  });
};

const usePartStoreSideLineHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "storesideline/usepart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json_data),
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("Something Wrong!");
    }
  });
};

export { usePartStoreSideLineHttp, getStoreSideLineHttp, saveStoreSideLineOneHttp, saveStoreSideLineManyHttp, deleteStoreSideLineOneHttp };
