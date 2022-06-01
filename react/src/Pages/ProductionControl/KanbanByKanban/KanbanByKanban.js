import Body from "../../../UI/Body";
import Col from "../../../UI/Col";
import GoodnNonGoodBtn from "../../../UI/GoodnNonGoodBtn";
import QPoint from "../../../UI/QPoint";
import Row from "../../../UI/Row";
import TableEchutter from "../../../UI/TableEchutter";
import UtilButton from "../../../UI/UtilButton";
import StatusBar from "../../StatusBar/StatusBar";

const KanbanByKanban = () => {
  return (
    <Body style={{ paddingTop: 0 }}>
      <StatusBar></StatusBar>
      <Row>
        <Col md="7" lg="7">
          <TableEchutter />
          <GoodnNonGoodBtn />
        </Col>
        <Col md="5" lg="5">
          <QPoint />
          <UtilButton />
        </Col>
      </Row>
    </Body>
  );
};

export default KanbanByKanban;
