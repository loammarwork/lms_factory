/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructionAsync } from "../Actions/instructionAction";
import { Host } from "../Config/env";
import ParetoChart from "./ParetoChart";

const QPoint = () => {
  const [typeQPoint, setTypeQPoint] = useState("image");
  const [isImageNull, setIsImageNull] = useState(null);
  const echutter = useSelector((state) => state.echutter);
  const echutterStatus = useSelector((state) => state.echutterStatus);
  const instruction = useSelector((state) => state.instruction);
  const instructionStatus = useSelector((state) => state.instructionStatus);
  const dispatch = useDispatch();
  let image_name = echutter[0]?.pd_code;
  useEffect(() => {
    dispatch(fetchInstructionAsync());
    fetch(`${Host}images/${image_name}.png`)
      .then((response) => {
        if (!response.ok) {
          setIsImageNull(true);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [image_name, isImageNull, dispatch]);
  console.log(image_name)
  console.log(echutterStatus.loading)
  return (
    <div className="table-responsive" style={{ padding: 0, margin: 0 }}>
      <div style={{ display: "flex" }}>
        <h2
          className="bg-white"
          style={{
            margin: 0,
            width: "100%",
            textAlign: "center",
            padding: "3px 0 3px 0",
            color: "#000",
            border: "1px solid gray",
            borderBottom: "none",
          }}
        >
          QPoint
        </h2>
        <button onClick={() => setTypeQPoint("work_instruction")} className="btn bg-indigo waves-effect" style={{ width: 450 }}>
          <i className={`material-icons`}>insert_invitation</i>
          <span>Work Instruction</span>
        </button>
        <button onClick={() => setTypeQPoint("image")} className="btn bg-green waves-effect" style={{ width: 250 }}>
          <i className={`material-icons`}>insert_photo</i>
          <span>Image</span>
        </button>
        <button onClick={() => setTypeQPoint("graph")} className="btn bg-blue waves-effect" style={{ width: 250 }}>
          <i className={`material-icons`}>insert_chart</i>
          <span>Graph</span>
        </button>
      </div>
      {typeQPoint === "image" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "246px",
            border: "1px solid black",
          }}
        >
          {echutterStatus.loading === true && (
            <div className="preloader pl-size-xl">
              <div className="spinner-layer">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          )}
          <img src={`${Host}images/${image_name}.png`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />
{/*           {(isImageNull === false && echutterStatus.loading === false) && <img src={`${Host}images/${image_name}.png`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />}
          {(isImageNull === true && echutterStatus.loading === false) && <img src={`${Host}images/noimage.png`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />} */}
        </div>
      )}
      {typeQPoint === "graph" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "246px",
            width: "100%",
            border: "1px solid black",
          }}
        >
          <ParetoChart style={{ width: "80%" }} />
        </div>
      )}

      {typeQPoint === "work_instruction" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "246px",
            width: "100%",
            border: "1px solid black",
          }}
        >
          {instructionStatus.loading === true && (
            <div className="preloader pl-size-xl">
              <div className="spinner-layer">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          )}
          {instructionStatus.loading === false && instruction.image_name !== null && <img src={`${Host}instruction/${instruction.image_name}`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />}
          {instructionStatus.loading === false && instruction.image_name === null && <img src={`${Host}images/noimage.png`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />}
        </div>
      )}
    </div>
  );
};

export default QPoint;
