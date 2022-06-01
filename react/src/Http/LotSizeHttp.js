/** @format */

import { Host } from "../Config/env";

const getLotSizeHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "lotsize");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const saveLotSizeOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "lotsize/insertone", {
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

const saveLotSizeHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "lotsize", {
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

const deleteLotSizeOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "lotsize/deleteone", {
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

const saveLotSizeManyHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "lotsize", {
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

export { getLotSizeHttp, saveLotSizeOneHttp, saveLotSizeHttp, deleteLotSizeOneHttp, saveLotSizeManyHttp };
