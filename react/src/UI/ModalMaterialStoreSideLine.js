/** @format */

import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalHeader from "./Modal/ModalHeader";
import ModalTitle from "./Modal/ModalTitle";
import ModalBody from "./Modal/ModalBody";
import ModalFooter from "./Modal/ModalFooter";
import ReactDOM from "react-dom";
import { deleteMaterialStoreSideLineOneHttp, saveMaterialStoreSideLineManyHttp } from "../Http/MaterialStoreSideLineHttp";

import ModalAddMaterialStore from "./ModalAddMaterialStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialStoreSideLineAsync, getMaterialStoreSideLine } from "../Actions/materialStoreSideLineAction";
const ModalMaterialStoreSideLine = () => {
  const dispatch = useDispatch();
  const materialStoreSideLine = useSelector((state) => state.materialStoreSideLine);

  async function saveMaterialStoreSideLineMany() {
    const newArray = materialStoreSideLine.map(({ part_name, part_no, customer, unit_kanban, ...keepAttrs }) => keepAttrs);
    await saveMaterialStoreSideLineManyHttp(newArray);
    dispatch(fetchMaterialStoreSideLineAsync());
    document.getElementById("btn-close-modal-material-store-side-line").click();
  }

  async function deleteMaterialStoreSideLineOne(pd_code) {
    await deleteMaterialStoreSideLineOneHttp(pd_code);
    dispatch(fetchMaterialStoreSideLineAsync());
  }
  return ReactDOM.createPortal(
    <>
      <ModalAddMaterialStore />
      <Modal id="modal-material-store-side-line" style={{ width: 1350 }}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Setup Material Store Side Line</ModalTitle>
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
                  Setup Material Store Side Line
                </h2>
                <button className="btn bg-green waves-effect" data-toggle="modal" data-target="#modal-add-material-store-side-line" type="button" style={{ width: 120 }}>
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
                <table className="table table-bordered border-primary">
                  <thead style={{ position: "sticky", top: "0px", zIndex: 100 }}>
                    <tr className="bg-indigo">
                      <td rowSpan={2} width={130} style={{ verticalAlign: "middle" }}>
                        Product Code
                      </td>
                      <td rowSpan={2} width={100} style={{ verticalAlign: "middle" }}>
                        Part No.
                      </td>
                      <td rowSpan={2} width={100} style={{ verticalAlign: "middle" }}>
                        Part Name
                      </td>
                      <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                        Customer
                      </td>
                      <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                        AGV Order per day
                      </td>
                      <td colSpan={2}>Stock (Kanban)</td>
                      <td>Kanban Actual</td>
                      <td>Unit Kanban</td>
                      <td>Amount</td>
                      <td>Stock LT</td>
                      <td rowSpan={2}></td>
                    </tr>
                    <tr className="bg-indigo">
                      <td>Min (KB)</td>
                      <td>Max (KB)</td>
                      <td>KB</td>
                      <td>Pcs/KB</td>
                      <td>Pcs</td>
                      <td>Day</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(materialStoreSideLine).length > 0 &&
                      materialStoreSideLine.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{item.pd_code}</th>
                            <th>{item.part_no}</th>
                            <td>{item.part_name}</td>
                            <td>{item.customer}</td>
                            <td>
                              <input
                                className="form-control"
                                type="number"
                                value={item.agv_order_per_day}
                                onChange={(e) => {
                                  let temp_state = [...materialStoreSideLine];
                                  temp_state[index].agv_order_per_day = e.target.value;
                                  dispatch(getMaterialStoreSideLine(temp_state));
                                }}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="number"
                                value={item.stock_kanban_min}
                                onChange={(e) => {
                                  let temp_state = [...materialStoreSideLine];
                                  temp_state[index].stock_kanban_min = e.target.value;
                                  dispatch(getMaterialStoreSideLine(temp_state));
                                }}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="number"
                                value={item.stock_kanban_max}
                                onChange={(e) => {
                                  let temp_state = [...materialStoreSideLine];
                                  temp_state[index].stock_kanban_max = e.target.value;
                                  dispatch(getMaterialStoreSideLine(temp_state));
                                }}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="number"
                                value={item.kanban_actual}
                                onChange={(e) => {
                                  let temp_state = [...materialStoreSideLine];
                                  temp_state[index].kanban_actual = e.target.value;
                                  dispatch(getMaterialStoreSideLine(temp_state));
                                }}
                              />
                            </td>
                            <td>{item.unit_kanban}</td>
                            <td>{item.kanban_actual * item.unit_kanban}</td>
                            <td>{((item.stock_kanban_max * item.unit_kanban) / item.agv_order_per_day).toFixed(2)}</td>
                            <td>
                              <button onClick={() => deleteMaterialStoreSideLineOne(item.pd_code)} className="btn btn-danger">
                                <i className="material-icons">cancel</i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter color="light-blue">
            <button onClick={() => saveMaterialStoreSideLineMany()} type="button" className="btn bg-green waves-effect">
              <i className="material-icons">save</i>
              <span>SAVE</span>
            </button>
            <button id="btn-close-modal-material-store-side-line" type="button" className="btn bg-red waves-effect" data-dismiss="modal">
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

export default ModalMaterialStoreSideLine;
