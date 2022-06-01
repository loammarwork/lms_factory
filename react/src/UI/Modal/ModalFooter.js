const ModalFooter = (props) => {
  const color = props.color !== undefined ? props.color : "indigo";
  return <div className={`modal-footer bg-${color}`}>{props.children}</div>;
};

export default ModalFooter;
