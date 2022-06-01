/** @format */

import { Host } from "../Config/env";

const getModeTypeHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "modetype");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const changeModeTypeHttp = (mode_type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "modetype", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode_type: mode_type }),
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export { getModeTypeHttp, changeModeTypeHttp };
