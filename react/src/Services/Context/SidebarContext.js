import React, { useState } from "react";

const SidebarContext = React.createContext({
  path: "/",
  setPathTo: (path) => {},
});

export default SidebarContext;

const SidebarContextProvider = (props) => {
  const [path, setPath] = useState("/");
  const setPathHandler = (paths) => {
    setPath(() => paths);
  };

  return (
    <SidebarContext.Provider value={{ path, setPathTo: setPathHandler }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export { SidebarContextProvider };
