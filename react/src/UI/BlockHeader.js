const BlockHeader = (props) => {
  return (
    <div className="block-header">
      <h2>{props.children}</h2>
    </div>
  );
};

export default BlockHeader;
