/** @format */

import { Host } from "../Config/env";

const getEchutterHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "echutter");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const sendGoodHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "echutter/good", {
        method: "POST",
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const sendNonGoodHttp = (error_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "echutter/nongood", {
        method: "POST",
        body: JSON.stringify({ error_code: error_code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getGraphProblem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "echutter/graph-problem");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getEchutterHttp, sendGoodHttp, sendNonGoodHttp, getGraphProblem };
