const ModalBody = (props) => {
  return (
    <div className="modal-body" style={props.style}>
      {props.children}
    </div>
  );
};

export default ModalBody;
