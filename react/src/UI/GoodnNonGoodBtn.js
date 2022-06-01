/** @format */

import { useDispatch } from "react-redux";
import { fetchBoardAsync } from "../Actions/boardAction";
import { fetchEchutterAsync } from "../Actions/echutterAction";
import { sendGoodHttp } from "../Http/EchutterHttp";
import Alert from "../Utils/Alert";
import ModalNonGood from "./ModalNonGood";

const GoodnNonGoodBtn = () => {
  const dispatch = useDispatch();
  async function sendGood() {
    let data = await sendGoodHttp();
    dispatch(fetchEchutterAsync());
    dispatch(fetchBoardAsync());
    Alert.success(data.message);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: 0,
        marginTop: 10,
      }}
    >
      <button onClick={sendGood} className="btn bg-green waves-effect" style={{ width: 200, height: 40 }}>
        <i className={`material-icons`}>check</i>
        <span>Good</span>
      </button>
      <button className="btn bg-red waves-effect" data-toggle="modal" data-target="#modal-nongood" style={{ width: 200, height: 40 }}>
        <i className={`material-icons`}>error</i>
        <span>Non Good</span>
      </button>
      <ModalNonGood />
    </div>
  );
};

export default GoodnNonGoodBtn;
