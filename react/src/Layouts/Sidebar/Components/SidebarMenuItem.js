import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SidebarContext from "../../../Services/Context/SidebarContext";

const SideBarMenuItem = (props) => {
  const sidebarCtx = useContext(SidebarContext);
  const [isActiveRoute, setIsActiveRoute] = useState(false);

  useEffect(() => {
    sidebarCtx.setPathTo(window.location.pathname);
    if (sidebarCtx.path === props.link_to) {
      setIsActiveRoute(true);
    } else {
      setIsActiveRoute(false);
    }
  }, [sidebarCtx, props.link_to]);
  return (
    <li
      className={isActiveRoute ? "active" : ""}
      onClick={() => sidebarCtx.setPathTo(window.location.pathname)}
    >
      <Link to={props.link_to}>
        <i className="material-icons">{props.icon}</i>
        <span>{props.name}</span>
      </Link>
    </li>
  );
};
export default SideBarMenuItem;
