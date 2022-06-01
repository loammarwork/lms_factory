/** @format */

import { useNavigate } from "react-router-dom";
import NavbarContainer from "./Components/NavbarContainer";
import NavbarDropdownMenu from "./Components/NavbarDropdownMenu";
import NavbarDropdownMenuItem from "./Components/NavbarDropdownMenuItem";
import NavbarDropdownMenuList from "./Components/NavbarDropdownMenuList";
import NavbarDropdownMenuTitle from "./Components/NavbarDropdownMenuTitle";
import NavbarHeader from "./Components/NavbarHeader";
import NavbarLogo from "./Components/NavbarLogo";
import NavbarToggleButton from "./Components/NavbarToggleButton";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <NavbarHeader>
        <NavbarToggleButton />
        <NavbarLogo />
      </NavbarHeader>
      <NavbarDropdownMenu>
        <NavbarDropdownMenuTitle title="Menu" />
        <NavbarDropdownMenuList>
          <NavbarDropdownMenuItem
            icon="home"
            menu_name="Home"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          />

          <NavbarDropdownMenuItem icon="power_settings_new" menu_name="Log out" onClick={(e) => e.preventDefault()} />
        </NavbarDropdownMenuList>
      </NavbarDropdownMenu>
    </NavbarContainer>
  );
};

export default Navbar;
