const TabList = (props) => {
  return (
    <ul className="nav nav-tabs tab-col-pink" role="tablist">
      {props.children}
    </ul>
  );
};

export default TabList;
