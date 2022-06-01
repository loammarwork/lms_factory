import { useParams } from "react-router-dom";
import Tab from "../Tab/Tab";

const ProductionControl = () => {
  const { type } = useParams();

  return <Tab type={type}></Tab>;
};

export default ProductionControl;
