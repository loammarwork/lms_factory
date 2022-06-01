/** @format */

import { useSelector } from "react-redux";
import Col from "../../UI/Col";
import Row from "../../UI/Row";
import StatusInfo from "../../UI/StatusInfo";
const StatusBar = (props) => {
  const board = useSelector((state) => state.board);
  if (Object.keys(board).findIndex((item) => item === "message") !== -1) {
    return (
      <>
        <Row>
          <Col lg="7">
            <Col lg="6">
              <table className="table table-reponsive" style={{ margin: 0 }}>
                <tbody>
                  <tr>
                    <th>LINE NAME</th>
                    <td>{"Knob Assembly"}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col lg="6">
              <table className="table table-reponsive" style={{ margin: 0 }}>
                <tbody>
                  <tr>
                    <th>Operator ID</th>
                    <td>{"01211"}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col lg="12">{props.children}</Col>
          </Col>
          <Col lg="5">
            <Col lg="6">
              <StatusInfo icon="cached" color="deep-purple" title="Time Period" value={"update time!"} />
            </Col>
            <Col lg="6">
              <StatusInfo icon="supervised_user_circle" color="deep-purple" title="Plan Out Put per Hours" value={`update time! PCS`} />
            </Col>
            <Col lg="6">
              <StatusInfo icon="event" color="deep-purple" title="Actual Out Put Per Hours" value={`update time! PCS`} />
            </Col>
            <Col lg="6">
              <StatusInfo icon="running_with_errors" color="red" title="Defect (NG)" value={`update time! PCS`} />
            </Col>
            <Col lg="6">
              <StatusInfo icon="account_tree" color="deep-purple" title="Diff" value={`update time! PCS`} />
            </Col>
            <Col lg="6">
              <StatusInfo icon="summarize" color="deep-purple" title="OEE" value="update time! %" />
            </Col>
            <Col lg="6">
              <StatusInfo icon="summarize" color="deep-purple" title="OA" value={`update time! %`} />
            </Col>
            <Col lg="6">
              <StatusInfo icon="summarize" color="deep-purple" title="NG" value="update time! %" />
            </Col>
          </Col>
        </Row>
      </>
    );
  }
  const full_shift = board.first_shift.concat(board.second_shift);
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const part_now = full_shift.find((item) => {
    let time_start_hour = parseInt(item.time.split("-")[0].split(":")[0]);
    let time_start_minute = parseInt(item.time.split("-")[0].split(":")[1]);
    let time_end_hour = parseInt(item.time.split("-")[1].split(":")[0]);
    let time_end_minute = parseInt(item.time.split("-")[1].split(":")[1]);
    /* console.log(hour, ">=", time_start_hour, "&&", hour, "<", time_end_hour, "&&", minute, ">=", time_start_minute, "&&", minute, "<", time_end_minute === 0 ? 60 : time_end_minute, "=", hour >= time_start_hour && hour < time_end_hour && minute >= time_start_minute && minute < (time_end_minute === 0 ? 60 : time_end_minute));
    console.log(hour >= time_start_hour && hour < time_end_hour); */
    return hour >= time_start_hour && hour < (time_end_hour === 0 ? 24 : time_end_hour) && minute >= time_start_minute && minute < (time_end_minute === 0 ? 60 : time_end_minute);
  });

  return (
    <>
      <Row>
        <Col lg="7">
          <Col lg="6">
            <table className="table table-reponsive" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <th>LINE NAME</th>
                  <td>{"Knob Assembly"}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col lg="6">
            <table className="table table-reponsive" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <th>Operator ID</th>
                  <td>{"01211"}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col lg="12">{props.children}</Col>
        </Col>
        <Col lg="5">
          <Col lg="6">
            <StatusInfo icon="cached" color="deep-purple" title="Time Period" value={part_now?.time} />
          </Col>
          <Col lg="6">
            <StatusInfo icon="supervised_user_circle" color="deep-purple" title="Plan Out Put per Hours" value={`${part_now?.plan_per_hours} PCS`} />
          </Col>
          <Col lg="6">
            <StatusInfo icon="event" color="deep-purple" title="Actual Out Put Per Hours" value={`${part_now?.actual_per_hours} PCS`} />
          </Col>
          <Col lg="6">
            <StatusInfo icon="running_with_errors" color="red" title="Defect (NG)" value={`${part_now?.defect} PCS`} />
          </Col>
          <Col lg="6">
            <StatusInfo icon="account_tree" color="deep-purple" title="Diff" value={`${part_now?.total_diff} PCS`} />
          </Col>
          <Col lg="6">
            <StatusInfo icon="summarize" color="deep-purple" title="OEE" value="95%" />
          </Col>
          <Col lg="6">
            <StatusInfo icon="summarize" color="deep-purple" title="OA" value={`${part_now?.percent_oa_collect} %`} />
          </Col>
          <Col lg="6">
            <StatusInfo icon="summarize" color="deep-purple" title="NG" value="0.00%" />
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default StatusBar;
