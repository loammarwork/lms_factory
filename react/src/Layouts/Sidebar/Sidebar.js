import SidebarContainer from "./Components/SidebarContainer";
import SidebarFooter from "./Components/SidebarFooter";
import SideBarMenuItem from "./Components/SidebarMenuItem";
import SideBarMenuList from "./Components/SidebarMenuList";
import SidebarUserInfo from "./Components/SidebarUserInfo";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarUserInfo
        user_image="/images/user.png"
        name="John Doe"
        position="Administrator"
      />
      <SideBarMenuList title="MAIN NAVIGATION">
        <SideBarMenuItem
          icon="dashboard"
          name="Dashboard"
          link_to="/dashboard"
        />
         <SideBarMenuItem
          icon="store"
          name="Store"
          link_to="/store"
        />
       
      </SideBarMenuList>
      <SidebarFooter projectName="LMS Project" version="1.0.0" />
    </SidebarContainer>
  );
};

export default Sidebar;
