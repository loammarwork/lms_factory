import { SidebarContextProvider } from "../../../Services/Context/SidebarContext";

const SideBarMenuList = (props) => {
  return (
    <SidebarContextProvider>
      <div className="menu">
        <ul className="list">
          <li className="header">{props.title}</li>
          {props.children}
        </ul>
      </div>
    </SidebarContextProvider>
  );
};
export default SideBarMenuList;
