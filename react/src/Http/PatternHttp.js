/** @format */

import { Host } from "../Config/env";

const getPatternHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "pattern");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const savePatternOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "pattern/insertone", {
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

const savePatternHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "pattern", {
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

const deletePatternOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "pattern/deleteone", {
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

const savePatternManyHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "pattern", {
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

export { getPatternHttp, savePatternOneHttp, savePatternHttp, deletePatternOneHttp, savePatternManyHttp };
