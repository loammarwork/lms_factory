/** @format */

import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalHeader from "./Modal/ModalHeader";
import ModalTitle from "./Modal/ModalTitle";
import ModalBody from "./Modal/ModalBody";
import ModalFooter from "./Modal/ModalFooter";
import ReactDOM from "react-dom";
import ModalAddLotSize from "./ModalAddLotSize";
import { deleteLotSizeOneHttp, saveLotSizeManyHttp } from "../Http/LotSizeHttp";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotSizeAsync, getLotSize } from "../Actions/lotSizeAction";
const ModalLotSize = () => {
  const dispatch = useDispatch();
  const lotSize = useSelector((state) => state.lotSize);

  async function saveLotSizeMany() {
    const newArray = lotSize.map(({ part_name, part_no, unit_kanban, ...keepAttrs }) => keepAttrs);
    await saveLotSizeManyHttp(newArray);
    dispatch(fetchLotSizeAsync());
    document.getElementById("btn-close-modal-lotsize").click();
  }

  async function deleteLotSizeOne(pd_code) {
    await deleteLotSizeOneHttp(pd_code);
    dispatch(fetchLotSizeAsync());
  }
  return ReactDOM.createPortal(
    <>
      <ModalAddLotSize />
      <Modal id="modal-lotsize" style={{ width: 1350 }}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Setup Lot Size</ModalTitle>
          </ModalHeader>
          <ModalBody>
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
                    borderBottom: "none",
                  }}
                >
                  Setup Lot Size Table
                </h2>
                <button className="btn bg-green waves-effect" data-toggle="modal" data-target="#modal-add-lotsize" type="button" style={{ width: 120 }}>
                  <i className={`material-icons`}>add</i>
                  <span>Add</span>
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
                  <thead style={{ position: "sticky", top: 0, zIndex: 99 }}>
                    <tr className="bg-indigo">
                      <th>Product Code</th>
                      <th>Part No.</th>
                      <th>Part Name</th>
                      <th>Lot Size</th>
                      <th>Kb Collection</th>
                      <th>Qty's Per Kanban</th>
                      <th>Qty's Collection</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotSize.length > 0 &&
                      lotSize.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.pd_code}</th>
                          <td>{item.part_no}</td>
                          <td>{item.part_name}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "72px" }}
                              min={0}
                              value={item.lotsize}
                              onChange={(e) => {
                                let temp_state = [...lotSize];
                                temp_state[index].lotsize = e.target.value;
                                dispatch(getLotSize(temp_state));
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "72px" }}
                              min={0}
                              value={item.kb_collection}
                              onChange={(e) => {
                                let temp_state = [...lotSize];
                                temp_state[index].kb_collection = e.target.value;
                                dispatch(getLotSize(temp_state));
                              }}
                            />
                          </td>
                          <td>{item.unit_kanban}</td>
                          <td>{item.unit_kanban * item.kb_collection}</td>
                          <td>
                            <button onClick={() => deleteLotSizeOne(item.pd_code)} className="btn btn-danger">
                              <i className="material-icons">cancel</i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter color="light-blue">
            <button onClick={() => saveLotSizeMany()} type="button" className="btn bg-green waves-effect">
              <i className="material-icons">save</i>
              <span>SAVE</span>
            </button>
            <button id="btn-close-modal-lotsize" type="button" className="btn bg-red waves-effect" data-dismiss="modal">
              <i className="material-icons">cancel</i>
              <span>CLOSE</span>
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("modal-overlay")
  );
};

export default ModalLotSize;
