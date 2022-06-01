import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Template = (props) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {props.children}
    </>
  );
};

export default Template;
