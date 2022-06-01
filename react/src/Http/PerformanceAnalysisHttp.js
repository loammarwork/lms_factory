/** @format */

import { Host } from "../Config/env";

const PerformanceAnalysisHttp = () => {
  return new Promise(async (resolve, reject) => {
    let response = await fetch(Host + "performancesheetdata").catch((err) => reject(err));
    let data = await response.json();
    resolve(data);
  });
};

const PerformanceAnalysisBoardHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "performanceanalysisboard");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject("Something wrong cannot fetch data from performanceanalysisboard api");
    }
  });
};

const PerformanceAnalysisTimeTableSaveHttp = (json_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "performancesheetdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json_data),
      });
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject("Something wrong cannot fetch data from performancesheetdata api");
    }
  });
};

export { PerformanceAnalysisHttp, PerformanceAnalysisBoardHttp, PerformanceAnalysisTimeTableSaveHttp };
