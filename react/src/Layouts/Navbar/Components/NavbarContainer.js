const NavbarContainer = (props) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">{props.children}</div>
    </nav>
  );
};

export default NavbarContainer;
