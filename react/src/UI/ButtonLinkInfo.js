/** @format */

import { Link } from "react-router-dom";

const ButtonLinkInfo = (props) => {
  return (
    <Link to={props.link_to} onClick={() => props.changeMode()}>
      <div className="info-box-3 bg-deep-purple2 hover-zoom-effect">
        <div className="icon">
          <i className="material-icons">{props.icon}</i>
        </div>
        <div className="content" style={{ width: "300px" }}>
          <div className="text" style={{ fontSize: "150%" }}>
            {props.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ButtonLinkInfo;
