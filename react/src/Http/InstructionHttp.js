/** @format */

import { Host } from "../Config/env";
import Alert from "../Utils/Alert";

function instructionUploadHttp(file_ref) {
  return new Promise(async (resolve, reject) => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    let formData = new FormData();

    formData.append("file", file_ref);
    formData.append("fileName", `${hour}${minute}${second}`);

    let response = await fetch(Host + "instruction", {
      method: "POST",
      body: formData,
    }).catch((err) => {
      console.log(err);
    });
    if (response.ok) {
      Alert.success("File has been uploaded!");
      resolve();
    } else {
      Alert.error("File has been not uploaded!");
      reject();
    }
  });
}

const getInstructionHttp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Host + "instruction/getimage");
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getInstructionHttp, instructionUploadHttp };
