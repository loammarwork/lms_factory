/** @format */

import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalHeader from "./Modal/ModalHeader";
import ModalTitle from "./Modal/ModalTitle";
import ModalBody from "./Modal/ModalBody";
import ModalFooter from "./Modal/ModalFooter";
import ReactDOM from "react-dom";
import ModalAddPattern from "./ModalAddPattern";
import { deletePatternOneHttp, savePatternManyHttp } from "../Http/PatternHttp";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatternAsync, getPattern } from "../Actions/patternAction";
import InputTimeUntilMask from "./Input/InputTimeUntilMask";
const ModalPattern = () => {
  const dispatch = useDispatch();
  const pattern = useSelector((state) => state.pattern);

  async function savePatternMany() {
    const newArray = pattern.map(({ part_name, part_no, unit_kanban, ...keepAttrs }) => keepAttrs);
    await savePatternManyHttp(newArray);
    dispatch(fetchPatternAsync());
    document.getElementById("btn-close-modal-pattern").click();
  }

  async function deletePatternOne(pd_code) {
    await deletePatternOneHttp(pd_code);
    dispatch(fetchPatternAsync());
  }
  return ReactDOM.createPortal(
    <>
      <ModalAddPattern />
      <Modal id="modal-pattern" style={{ width: 1350 }}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Setup Pattern</ModalTitle>
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
                  Setup Pattern Table
                </h2>
                <button className="btn bg-green waves-effect" data-toggle="modal" data-target="#modal-add-pattern" type="button" style={{ width: 120 }}>
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
                      <th>Line</th>
                      <th>Machine</th>
                      <th>Mo Id</th>
                      <th>Prepare Setup</th>
                      <th>Setup Time</th>
                      <th>Time Period</th>
                      <th>Part No.</th>
                      <th>Part Name</th>
                      <th>Kanban Unit</th>
                      <th>Qty's Per Kanban</th>
                      <th>Qty's Collection</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pattern.length > 0 &&
                      pattern.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.pd_code}</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              style={{ width: "72px" }}
                              value={item.line}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].line = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              style={{ width: "72px" }}
                              value={item.machine}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].machine = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              style={{ width: "72px" }}
                              value={item.mo_id}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].mo_id = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>
                            <InputTimeUntilMask
                              style={{
                                width: "100%",
                                textAlign: "center",
                              }}
                              value={item.prepare_setup_time}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].prepare_setup_time = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>
                            <InputTimeUntilMask
                              style={{
                                width: "100%",
                                textAlign: "center",
                              }}
                              value={item.setup_time}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].setup_time = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>
                            <InputTimeUntilMask
                              style={{
                                width: "100%",
                                textAlign: "center",
                              }}
                              value={item.time_period}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].time_period = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>{item.part_no}</td>
                          <td>{item.part_name}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "72px" }}
                              value={item.kb_unit || 0}
                              onChange={(e) => {
                                let temp_state = [...pattern];
                                temp_state[index].kb_unit = e.target.value;
                                dispatch(getPattern(temp_state));
                              }}
                            />
                          </td>
                          <td>{item.unit_kanban}</td>
                          <td>{(item.unit_kanban * item.kb_unit).toString()}</td>
                          <td>
                            <button onClick={() => deletePatternOne(item.pd_code)} className="btn btn-danger">
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
            <button onClick={() => savePatternMany()} type="button" className="btn bg-green waves-effect">
              <i className="material-icons">save</i>
              <span>SAVE</span>
            </button>
            <button id="btn-close-modal-pattern" type="button" className="btn bg-red waves-effect" data-dismiss="modal">
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

export default ModalPattern;
