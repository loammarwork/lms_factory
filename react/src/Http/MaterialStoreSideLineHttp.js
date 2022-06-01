/** @format */

import { Host } from "../Config/env";

const getMaterialStoreSideLineHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "materialstoresideline");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("Something Wrong!");
    }
  });
};

const saveMaterialStoreSideLineOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "materialstoresideline/insertone", {
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

const saveMaterialStoreSideLineManyHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "materialstoresideline", {
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
const deleteMaterialStoreSideLineOneHttp = (pd_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "materialstoresideline/deleteone", {
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

const usePartMaterialStoreSideLineHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "materialstoresideline/usepart", {
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

export { usePartMaterialStoreSideLineHttp, getMaterialStoreSideLineHttp, saveMaterialStoreSideLineOneHttp, saveMaterialStoreSideLineManyHttp, deleteMaterialStoreSideLineOneHttp };
