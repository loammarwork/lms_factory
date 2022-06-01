const Body = (props) => {
  return (
    <div className="body" style={props.style}>
      {props.children}
    </div>
  );
};

export default Body;
