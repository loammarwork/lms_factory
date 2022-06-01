/** @format */

import { useEffect } from "react";
import Body from "../../UI/Body";
import ModalPerformanceAnalysis from "../../UI/ModalPerformanceAnalysis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBoardAsync } from "../../Actions/boardAction";
const PerformanceAnalysis = () => {
  const board = useSelector((state) => state.board);
  const boardStatus = useSelector((state) => state.boardStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoardAsync());
  }, [dispatch]);

  return (
    <Body style={{ paddingTop: 0, paddingLeft: 5, paddingRight: 5 }}>
      <>
        {boardStatus.loading === true && <p>loading...</p>}
        {boardStatus.error !== "" && <p>Found Error</p>}
        <ModalPerformanceAnalysis />
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
              Performance Analysis
            </h2>
            <button className="btn bg-blue waves-effect" data-toggle="modal" data-target="#modal-performance-analysis" style={{ width: 120 }}>
              <i className={`material-icons`}>settings</i>
              <span>Setup</span>
            </button>
          </div>
          <div
            style={{
              height: "550px",
              overflow: "auto",
              border: "1px solid #000",
              borderTop: "none",
            }}
          >
            <table className="table table-bordered border-primary" style={{ borderTop: 0, borderCollapse: "unset" }}>
              <thead style={{ position: "sticky", top: "0px" }}>
                <tr className="bg-indigo">
                  <td width={200}></td>
                  <td rowSpan={2} width={100}>
                    Time
                  </td>
                  <td colSpan={2}>Plan</td>
                  <td colSpan={4}>Actual</td>
                  <td colSpan={4}>Problem</td>
                  <td rowSpan={2}>% OA Collect</td>
                </tr>
                <tr className="bg-indigo">
                  <td> 2 Shift</td>
                  <td>Actual/Hr.</td>
                  <td>Collect</td>
                  <td>Actual/Hr.</td>
                  <td>Collect</td>
                  <td>% Actual Workload</td>
                  <td>% On Process</td>
                  <td>Defect</td>
                  <td>% Defect</td>
                  <td>Delay</td>
                  <td>Total Diff</td>
                </tr>
              </thead>
              {Object.keys(board).includes("message") === true && (
                <tbody>
                  <tr className="bg-red">
                    <th colSpan="13" style={{ textAlign: "center", height: "473px" }}>
                      {board.message}
                    </th>
                  </tr>
                </tbody>
              )}
              {Object.keys(board).includes("message") !== true && (
                <>
                  <tbody>
                    <tr className="bg-blue">
                      <th colSpan="13">First Shift</th>
                    </tr>

                    {Object.keys(board).length > 0 &&
                      board.first_shift.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{item.type_process}</th>
                            <td>{item.time}</td>
                            <td>{item.plan_per_hours}</td>
                            <td>{item.plan_per_hours_collect}</td>
                            <td>{item.actual_per_hours}</td>
                            <td>{item.actual_per_hours_collect}</td>
                            <td>{item.percent_actual_workload} %</td>
                            <td>{item.percent_on_process} %</td>
                            <td>{item.defect}</td>
                            <td>{item.percent_defect} %</td>
                            <td>{item.delay}</td>
                            <td>{item.total_diff}</td>
                            <td>{item.percent_oa_collect} %</td>
                          </tr>
                        );
                      })}

                    <tr className="bg-blue">
                      <th colSpan="13">Second Shift</th>
                    </tr>
                    {Object.keys(board).length > 0 &&
                      board.second_shift.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{item.type_process}</th>
                            <td>{item.time}</td>
                            <td>{item.plan_per_hours}</td>
                            <td>{item.plan_per_hours_collect}</td>
                            <td>{item.actual_per_hours}</td>
                            <td>{item.actual_per_hours_collect}</td>
                            <td>{item.percent_actual_workload} %</td>
                            <td>{item.percent_on_process} %</td>
                            <td>{item.defect}</td>
                            <td>{item.percent_defect} %</td>
                            <td>{item.delay}</td>
                            <td>{item.total_diff}</td>
                            <td>{item.percent_oa_collect} %</td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot style={{ position: "sticky", bottom: "0px" }}>
                    {Object.keys(board).length > 0 && (
                      <tr className="bg-indigo">
                        <td>Total</td>
                        <td></td>
                        <td>{board.total.plan_per_hours_sum}</td>
                        <td>{board.total.plan_per_hours_collect_sum}</td>
                        <td>{board.total.actual_per_hours_sum}</td>
                        <td>{board.total.actual_per_hours_collect_sum}</td>
                        <td>{board.total.percent_actual_workload_sum} %</td>
                        <td>{board.total.percent_on_process_sum} %</td>
                        <td>{board.total.defect_sum}</td>
                        <td>{board.total.percent_defect_sum} %</td>
                        <td>{board.total.delay_sum}</td>
                        <td>{board.total.total_diff_sum}</td>
                        <td>{board.total.percent_oa_collect_sum} %</td>
                      </tr>
                    )}
                  </tfoot>
                </>
              )}
            </table>
          </div>
        </div>
      </>
    </Body>
  );
};

export default PerformanceAnalysis;
