const ModalTitle = (props) => {
  return (
    <h4 className="modal-title" id="defaultModalLabel">
      {props.children}
    </h4>
  );
};

export default ModalTitle;
