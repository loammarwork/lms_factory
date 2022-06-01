const StatusInfo = (props) => {
  return (
    <div
      className={`info-box bg-${props.color}`}
      style={{ boxShadow: "none", marginBottom: 0, height: 50 }}
    >
      <div
        className="icon"
        style={{
          width: 35,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i className="material-icons" style={{ fontSize: 25 }}>
          {props.icon}
        </i>
      </div>
      <div style={{ padding: "5px 0px 5px 5px" }}>
        <div style={{}}>{props.title}</div>
        <div>{props.value}</div>
      </div>
    </div>
  );
};

export default StatusInfo;
