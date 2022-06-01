/** @format */

import { useDispatch } from "react-redux";
import { fetchInstructionAsync } from "../Actions/instructionAction";
import { instructionUploadHttp } from "../Http/InstructionHttp";

const UtilButton = () => {
  const dispatch = useDispatch();
  const saveFile = async (e) => {
    await instructionUploadHttp(e.target.files[0]);
    dispatch(fetchInstructionAsync());
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        paddingLeft: 0,
        marginTop: 10,
      }}
    >
      <div>
        <button className="btn bg-indigo waves-effect" style={{ width: 130, height: 40 }}>
          <i className={`material-icons`}>alarm_on</i>
          <span>Time Record</span>
        </button>
        <button className="btn bg-red waves-effect" style={{ width: 130, height: 40 }}>
          <i className={`material-icons`}>alarm_on</i>
          <span>13.00-13.01</span>
        </button>
      </div>

      <input id="instruction-upload" onChange={saveFile} type="file" style={{ display: "none" }}></input>
      <button className="btn bg-green waves-effect" style={{ width: 130 }} onClick={() => document.getElementById("instruction-upload").click()}>
        <i className={`material-icons`}>upload</i>
        <span>Upload</span>
      </button>
    </div>
  );
};

export default UtilButton;
