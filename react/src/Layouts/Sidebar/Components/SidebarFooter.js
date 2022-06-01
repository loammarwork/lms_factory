const SidebarFooter = (props) => {
  return (
    <div className="legal">
      <div className="copyright">
        &copy; <a href="/#">{props.projectName}</a>.
      </div>
      <div className="version">
        <b>Version: </b> {props.version}
      </div>
    </div>
  );
};

export default SidebarFooter;
