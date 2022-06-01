const SidebarUserInfo = (props) => {
  return (
    <div className="user-info">
      <div className="image">
        <img src={props.user_image} width={65} height={65} alt="user_image" />
        <div className="info-container">
          <div
            id="userName"
            className="name text-center"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <p style={{ fontSize: 16 }}> Name : {props.name}</p>
            <p style={{ fontSize: 14 }}> Position : {props.position}</p>
          </div>
          <div id="userRole" className="role"></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
