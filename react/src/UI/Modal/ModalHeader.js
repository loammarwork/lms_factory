const ModalHeader = (props) => {
  const color = props.color !== undefined ? props.color : "indigo";
  return <div className={`modal-header bg-${color}`}>{props.children}</div>;
};

export default ModalHeader;
