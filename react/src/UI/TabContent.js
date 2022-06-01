const TabContent = (props) => {
  return (
    <div
      role="tabpanel"
      className={`tab-pane fade ${props.className}`}
      id={props.link_to_tab_item}
    >
      <props.link_to_component />
    </div>
  );
};

export default TabContent;
