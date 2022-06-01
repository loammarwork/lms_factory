/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEchutterAsync } from "../Actions/echutterAction";
import Alert from "../Utils/Alert";

const TableEchutter = () => {
  const dispatch = useDispatch();
  const echutter = useSelector((state) => state.echutter);
  const echutterStatus = useSelector((state) => state.echutterStatus);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(fetchEchutterAsync());
    }, 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  async function fetchEchutter() {
    dispatch(fetchEchutterAsync());
    Alert.success("Echutter has been updated!");
  }
  return (
    <>
      <div className="table" style={{ padding: 0, margin: 0 }}>
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
            Echutter
          </h2>
          <button onClick={fetchEchutter} className="btn bg-blue waves-effect" style={{ width: 120 }}>
            <i className={`material-icons`}>refresh</i>
            <span>Refresh</span>
          </button>
        </div>
        <div
          style={{
            height: "246px",
            overflow: "auto",
            border: "1px solid #000",
          }}
        >
          <table className="table table-condensed">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr className="bg-indigo">
                <th>No.</th>
                <th>Status</th>
                <th>Part No.</th>
                <th>Part Name</th>
                <th>Qty/K</th>
              </tr>
            </thead>
            <tbody>
              {echutterStatus.loading === true && (
                <tr>
                  <th style={{ verticalAlign: "middle" }}>loading...</th>
                </tr>
              )}
              {echutterStatus.error !== "" && (
                <tr>
                  <th style={{ verticalAlign: "middle" }}>{echutterStatus.error}</th>
                </tr>
              )}
              {echutterStatus.loading === false &&
                echutter.length > 0 &&
                echutter.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th style={{ verticalAlign: "middle" }}>{item.no}</th>
                      <td>
                        <span className={item.status === "Waiting" ? `btn bg-orange` : `btn bg-green`}>{item.status}</span>
                      </td>
                      <td>{item.part_name}</td>
                      <td>{item.part_no}</td>
                      <td>{item.qty_per_box}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableEchutter;
