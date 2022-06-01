const Modal = (props) => {
  let size = props.size === undefined ? "" : props.size;
  return (
    <div
      className="modal fade"
      id={`${props.id}`}
      tabIndex="-1"
      role="dialog"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div
        className={`modal-dialog modal-${size}`}
        role="document"
        style={props.style}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
