import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Link
      className="navbar-brand"
      to="/"
      onClick={() => alert("This nothing.")}
    >
      <div className="image">
        <img
          src={"/images/LMS_LOGO3.png"}
          width={100}
          height={40}
          alt={"Logo"}
        />
      </div>
    </Link>
  );
};

export default NavbarLogo;
