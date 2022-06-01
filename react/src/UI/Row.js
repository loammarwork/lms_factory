const Row = (props) => {
  return (
    <div className="row clearfix" style={props.style}>
      {props.children}
    </div>
  );
};
export default Row;
