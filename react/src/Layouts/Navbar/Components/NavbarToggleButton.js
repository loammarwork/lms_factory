import { Link } from "react-router-dom";

const NavbarToggleButton = (props) => {
  return (
    <>
      <Link
        to="/"
        onClick={(e) => e.preventDefault()}
        className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar-collapse"
        aria-expanded="false"
      ></Link>
      <Link to="/" onClick={(e) => e.preventDefault()} className="bars"></Link>
    </>
  );
};

export default NavbarToggleButton;
