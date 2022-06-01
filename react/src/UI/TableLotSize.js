/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotSizeAsync } from "../Actions/lotSizeAction";
import ModalLotSize from "./ModalLotSize";

const TableLotSize = () => {
  const dispatch = useDispatch();
  const lotSize = useSelector((state) => state.lotSize);
  const lotSizeStatus = useSelector((state) => state.lotSizeStatus);
  useEffect(() => {
    dispatch(fetchLotSizeAsync());
  }, [dispatch]);
  return (
    <>
      <ModalLotSize />
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
            LotSize
          </h2>
          <button className="btn bg-blue waves-effect" data-toggle="modal" data-target="#modal-lotsize" style={{ width: 120 }}>
            <i className={`material-icons`}>save</i> <span>KB Record</span>
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
                <th>No.</th>
                <th>Part Name</th>
                <th>Lot Size(KB)</th>
                <th>KB Collection</th>
              </tr>
            </thead>
            <tbody>
              {lotSizeStatus.loading === true && (
                <tr>
                  <th scope="row">loading</th>
                </tr>
              )}
              {lotSizeStatus.loading === false &&
                lotSize.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.part_name}</td>
                    <td>{item.lotsize}</td>
                    <td>{item.kb_collection}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableLotSize;
