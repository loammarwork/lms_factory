/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatternAsync } from "../Actions/patternAction";
import ModalPattern from "./ModalPattern";

const TablePattern = () => {
  const dispatch = useDispatch();
  const pattern = useSelector((state) => state.pattern);
  const patternStatus = useSelector((state) => state.patternStatus);
  useEffect(() => {
    dispatch(fetchPatternAsync());
  }, [dispatch]);
  return (
    <>
      <ModalPattern />
      <div className="table" style={{ padding: 0 }}>
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
              borderRight: "none",
              borderBottom: "none",
            }}
          >
            Pattern
          </h2>
          <button className="btn bg-blue waves-effect" data-toggle="modal" data-target="#modal-pattern" style={{ width: 120 }}>
            <i className={`material-icons`}>save</i>
            <span>KB Record</span>
          </button>
        </div>
        <div
          style={{
            height: "130px",
            overflow: "auto",
            border: "1px solid #000",
          }}
        >
          <table className="table table-condensed">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr className="bg-indigo">
                <th>Time Period</th>
                <th>Part No.</th>
                <th>Part Name</th>
                <th>Kanban Unit</th>
              </tr>
            </thead>
            <tbody>
              {patternStatus.loading === true && (
                <tr>
                  <th scope="row">loading</th>
                </tr>
              )}
              {patternStatus.loading === false &&
                pattern.map((item, index) => (
                  <tr key={index}>
                    <td>{item.time_period}</td>
                    <td>{item.part_no}</td>
                    <td>{item.part_name}</td>
                    <td>{item.kb_unit}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TablePattern;
