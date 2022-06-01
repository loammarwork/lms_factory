const TabItem = (props) => {
  return (
    <li role="presentation" className={props.className}>
      <a href={`#${props.link_to}`} data-toggle="tab">
        {props.title}
      </a>
    </li>
  );
};
export default TabItem;
