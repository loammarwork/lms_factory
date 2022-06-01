/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructionAsync } from "../../Actions/instructionAction";
import { Host } from "../../Config/env";

const MIFC = () => {
  const dispatch = useDispatch();
  const instruction = useSelector((state) => state.instruction);
  const instructionStatus = useSelector((state) => state.instructionStatus);
  useEffect(() => {
    dispatch(fetchInstructionAsync());
  }, [dispatch]);

  return (
    <div>
      {instructionStatus.loading === true && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
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
        </div>
      )}
      {instructionStatus.loading === false && instruction.image_name !== null && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <img src={`${Host}instruction/${instruction.image_name}`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />
        </div>
      )}
      {instructionStatus.loading === false && instruction.image_name === null && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "568px" }}>
          <img src={`${Host}images/noimage.png`} width="80%" height="80%" style={{ objectFit: "contain" }} alt="" />
        </div>
      )}
    </div>
  );
};

export default MIFC;
