import Card from "../../UI/Card";
import Content from "../../UI/Content";
import TabContent from "../../UI/TabContent";
import TabItem from "../../UI/TabItem";
import TabList from "../../UI/TabList";
import TabPage from "../../UI/TabPage";
import LotSize from "../ProductionControl/LotSize/LotSize";
import KanbanByKanban from "../ProductionControl/KanbanByKanban/KanbanByKanban";
import Pattern from "../ProductionControl/Pattern/Pattern";
import PerformanceAnalysis from "../PerfomanceAnalysis/PerformanceAnalysis";
import MIFC from "../MIFC/MIFC";
const Tab = (props) => {
  return (
    <Content>
      <Card>
        <TabList>
          <TabItem
            className="active"
            link_to="production-control"
            title="PRODUCTION CONTROL"
          />
          <TabItem
            link_to="performance-analysis"
            title="PERFORMANCE ANALYSIS"
          />
          <TabItem link_to="mifc" title="MIFC" />
        </TabList>
        <TabPage>
          <TabContent
            className="in active"
            link_to_tab_item="production-control"
            link_to_component={
              props.type === "kanban-by-kanban"
                ? KanbanByKanban
                : props.type === "lot-size"
                ? LotSize
                : Pattern
            }
          />
          <TabContent
            link_to_tab_item="performance-analysis"
            link_to_component={PerformanceAnalysis} //PerfomanceAnalysis
          />
          <TabContent
            link_to_tab_item="mifc"
            link_to_component={MIFC} //MIFC
          />
        </TabPage>
      </Card>
    </Content>
  );
};

export default Tab;
