import { Link } from "react-router-dom";

const NavbarDropdownMenuItem = (props) => {
  return (
    <li style={{ display: "flex" }}>
      <Link
        to="/"
        onClick={props.onClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <i className="material-icons">{props.icon}</i>
        <span>{props.menu_name}</span>
      </Link>
    </li>
  );
};

export default NavbarDropdownMenuItem;
