const ListTableProblem = (props) => {
  return (
    <div className="table" style={{ padding: 0, overflowY: "hidden" }}>
      <div style={{ display: "flex" }}>
        <h2
          className="bg-dark-blue"
          style={{
            margin: 0,
            width: "100%",
            textAlign: "center",
            padding: "3px 0 3px 0",
            border: "1px solid gray",
            borderBottom: "none",
            color: "#fff",
          }}
        >
          List Type Problem
        </h2>
      </div>
      <div
        style={{
          height: "505px",
          overflow: "hidden",
          border: "1px solid #000",
        }}
      >
        {props.TypeProblem.map((type, index) => (
          <table
            className="table table-condensed "
            key={Math.random()}
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr className="bg-blue" style={{ color: "#fff" }}>
                <th style={{ padding: 0 }} colSpan="2">{`(${index + 1}XX) ${
                  type.type
                } Problem`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 0 }}> Code </td>
                <td style={{ padding: 0 }}> Reason</td>
              </tr>
              {type.data_problem.map((item, index) => (
                <tr key={Math.random()}>
                  <td style={{ padding: 0, width: 200 }}>{item.code}</td>
                  <td style={{ padding: 0 }}>{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default ListTableProblem;
