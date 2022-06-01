import { Link } from "react-router-dom";

const NavbarDropdownMenu = (props) => {
  return (
    <div className="collapse navbar-collapse" id="navbar-collapse">
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <Link
            to="/"
            onClick={(e) => e.preventDefault()}
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
          >
            <i className="material-icons">more_verts</i>
          </Link>
          <ul className="dropdown-menu">{props.children}</ul>
        </li>
      </ul>
    </div>
  );
};

export default NavbarDropdownMenu;
