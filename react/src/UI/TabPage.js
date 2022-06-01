const TabPage = (props) => {
  return (
    <div className="tab-content" style={{ padding: 7 }}>
      {props.children}
    </div>
  );
};

export default TabPage;
