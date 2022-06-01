import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ProductionControl from "../Pages/ProductionControl/ProductionControl";
import Store from "../Pages/Store/Store";

const RouteContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="store" element={<Store />} />
      <Route path="production-control" element={<ProductionControl />}>
        <Route path=":type" element={<ProductionControl />} />
      </Route>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RouteContent;
