const NavbarDropdownMenuList = (props) => {
  return (
    <li className="body">
      <ul className="menu" style={{ listStyle: "none" }}>
        {props.children}
      </ul>
    </li>
  );
};

export default NavbarDropdownMenuList;
