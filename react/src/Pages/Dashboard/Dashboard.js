/** @format */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEchutterAsync } from "../../Actions/echutterAction";
import { changeModeTypeHttp } from "../../Http/ModeTypeHttp";
import BlockHeader from "../../UI/BlockHeader";
import ButtonLinkInfo from "../../UI/ButtonLinkInfo";
import Col from "../../UI/Col";
import Container from "../../UI/Container";
import Content from "../../UI/Content";
import Row from "../../UI/Row";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEchutterAsync());
  }, [dispatch]);
  return (
    <>
      <Content>
        <Container>
          <BlockHeader>Dashboard</BlockHeader>
          <Row>
            <Col md="4" lg="4">
              <ButtonLinkInfo link_to="/production-control/kanban-by-kanban" icon="local_shipping" title="Kanban By Kanban" changeMode={async () => await changeModeTypeHttp(0)} />
            </Col>
            <Col md="4" lg="4">
              <ButtonLinkInfo link_to="/production-control/lot-size" icon="build" title="Lot size" changeMode={async () => await changeModeTypeHttp(1)} />
            </Col>
            <Col md="4" lg="4">
              <ButtonLinkInfo link_to="/production-control/pattern" icon="build" title="Pattern" changeMode={async () => await changeModeTypeHttp(2)} />
            </Col>
          </Row>
        </Container>
      </Content>
    </>
  );
};

export default Dashboard;
