const Col = (props) => {
  let lg = props.lg === undefined ? 12 : props.lg;
  let md = props.md === undefined ? 12 : props.md;
  let sm = props.sm === undefined ? 12 : props.sm;
  let xs = props.xs === undefined ? 12 : props.xs;
  return (
    <div
      className={`col-lg-${lg} col-md-${md} col-sm-${sm} col-xs-${xs}`}
      style={{ marginBottom: 0, padding: 3 }}
    >
      {props.children}
    </div>
  );
};

export default Col;
