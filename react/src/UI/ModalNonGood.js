/** @format */

import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalHeader from "./Modal/ModalHeader";
import ModalTitle from "./Modal/ModalTitle";
import ModalBody from "./Modal/ModalBody";
import ModalFooter from "./Modal/ModalFooter";
import ReactDOM from "react-dom";
import { useState } from "react";
import Col from "./Col";
import Row from "./Row";
import ListTableProblem from "./ListTableProblem";
import Body from "./Body";
import Card from "./Card";
import Header from "./Header";
import { sendNonGoodHttp } from "../Http/EchutterHttp";
import { fetchEchutterAsync } from "../Actions/echutterAction";
import { fetchParetoChartAsync } from "../Actions/paretoChartAction";
import { useDispatch } from "react-redux";
import { fetchBoardAsync } from "../Actions/boardAction";
import Alert from "../Utils/Alert";

const ModalNonGood = () => {
  const TypeProblem = [
    {
      type: "Man",
      data_problem: [
        {
          code: 101,
          reason: "พนักงานขันน๊อตไม่แน่น",
        },
        {
          code: 102,
          reason: "	พนักงานทำงานลืมทาจาระบี",
        },
        {
          code: 103,
          reason: "พนักงานทำงานผิดขั้นตอน",
        },
        {
          code: 104,
          reason: "พนักงานประกอบผิดวิธี",
        },
        {
          code: 105,
          reason: "พนักงานตรวจสอบผิดวิธี",
        },
      ],
    },
    {
      type: "Machine",
      data_problem: [
        {
          code: 201,
          reason: "ทำการบำรุงรักษาประจำปี",
        },
        {
          code: 202,
          reason: "เครื่องจักรขัดข้อง",
        },
        {
          code: 203,
          reason: "รอเบิกแม่พิมพ์",
        },
      ],
    },
    {
      type: "Material",
      data_problem: [
        {
          code: 301,
          reason: "ยางดิบหมดอายุ",
        },
        {
          code: 302,
          reason: "เหล็กเส้นขึ้นสนิม",
        },
        {
          code: 303,
          reason: "เหล็กคอยล์ไม่เพียงพอที่จะทำการรีดขึ้นรูป",
        },
      ],
    },
    {
      type: "Method",
      data_problem: [
        {
          code: 401,
          reason: "งานประกอบไม่ได้ตามมาตรฐาน",
        },
        {
          code: 402,
          reason: "ตรวจสอบคุณไม่ครบตาม Q - Point",
        },
      ],
    },
    {
      type: "Other",
      data_problem: [
        {
          code: 501,
          reason: "Other",
        },
      ],
    },
  ];
  const [typeProblem, setTypeProblem] = useState("");
  const [codeProblem, setCodeProblem] = useState("");
  const dispatch = useDispatch();

  async function sendNonGood() {
    let data = await sendNonGoodHttp(codeProblem);
    dispatch(fetchEchutterAsync());
    dispatch(fetchParetoChartAsync());
    dispatch(fetchBoardAsync());
    document.getElementById("btn-close-modal-non-good").click();
    Alert.success(data.message);
  }
  return ReactDOM.createPortal(
    <>
      <Modal id="modal-nongood" style={{ width: 1333 }}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Report Non Good Item</ModalTitle>
          </ModalHeader>
          <ModalBody style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Row>
              <Col lg="8">
                <ListTableProblem TypeProblem={TypeProblem} />
              </Col>
              <Col lg="4">
                <div style={{ display: "flex" }}>
                  <h2
                    className="bg-dark-blue"
                    style={{
                      margin: 0,
                      width: "100%",
                      textAlign: "center",
                      padding: "3px 0 3px 0",
                      border: "1px solid gray",
                      borderBottom: "none",
                      color: "#fff",
                    }}
                  >
                    List Type Problem
                  </h2>
                </div>

                <Card>
                  <Header>Choose type problem and select code</Header>
                  <Body>
                    <Row>
                      <Col sm="6" md="6" lg="6">
                        <select
                          className="form-control"
                          value={typeProblem}
                          onChange={(e) => {
                            setTypeProblem(e.target.value);
                            setCodeProblem("");
                          }}
                        >
                          <option
                            value=""
                            style={{ textAlign: "center" }}
                            onChange={(e) => {
                              setCodeProblem(e.target.value);
                            }}
                          >
                            -- Select Type --
                          </option>
                          <option value="1">1XX</option>
                          <option value="2">2XX</option>
                          <option value="3">3XX</option>
                          <option value="4">4XX</option>
                          <option value="5">5XX</option>
                        </select>
                      </Col>

                      {typeProblem === "1" && (
                        <Col sm="6" md="6" lg="6">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setCodeProblem(e.target.value);
                            }}
                          >
                            <option value=""> -- Select Code --</option>
                            <option value="101">101</option>
                            <option value="102">102</option>
                            <option value="103">103</option>
                            <option value="104">104</option>
                            <option value="105">105</option>
                          </select>
                        </Col>
                      )}
                      {typeProblem === "2" && (
                        <Col sm="6" md="6" lg="6">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setCodeProblem(e.target.value);
                            }}
                          >
                            <option value=""> -- Select Code --</option>
                            <option value="201">201</option>
                            <option value="202">202</option>
                            <option value="203">203</option>
                          </select>
                        </Col>
                      )}
                      {typeProblem === "3" && (
                        <Col sm="6" md="6" lg="6">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setCodeProblem(e.target.value);
                            }}
                          >
                            <option value=""> -- Select Code --</option>
                            <option value="301">301</option>
                            <option value="302">302</option>
                            <option value="303">303</option>
                          </select>
                        </Col>
                      )}
                      {typeProblem === "4" && (
                        <Col sm="6" md="6" lg="6">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setCodeProblem(e.target.value);
                            }}
                          >
                            <option value=""> -- Select Code --</option>
                            <option value="401">401</option>
                            <option value="402">402</option>
                          </select>
                        </Col>
                      )}
                      {typeProblem === "5" && (
                        <Col sm="6" md="6" lg="6">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setCodeProblem(e.target.value);
                            }}
                          >
                            <option value=""> -- Select Code --</option>
                            <option value="501">501</option>
                          </select>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col lg="12">
                        <button type="button" onClick={sendNonGood} className="btn bg-green waves-effect" disabled={typeProblem === "" && codeProblem === ""}>
                          <i className="material-icons">assignment_late</i>
                          <span>Report</span>
                        </button>
                      </Col>
                    </Row>
                  </Body>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter color="light-blue">
            <button id="btn-close-modal-non-good" type="button" className="btn bg-red waves-effect" data-dismiss="modal">
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

export default ModalNonGood;
