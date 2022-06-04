import React from "react";
import "./style.scss"
interface IUserAvatar {
  image_url: string;
}

const UserAvatar: React.FC<IUserAvatar> = (props) => {
  if (props.image_url) {
    return <img src={props.image_url} alt="" className="user-avater-img" />;
  } else {
    return (
      <div className="user-avater-div">
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16">
          <path
            id="Shape"
            d="M4,9H4A4.012,4.012,0,0,1,0,5V4A4.012,4.012,0,0,1,4,0H4A4.012,4.012,0,0,1,8,4V5A4.012,4.012,0,0,1,4,9Z"
            transform="translate(3)"
            fill="#fff"
          />
          <path id="Shape-2" data-name="Shape" d="M9,0H5A4.951,4.951,0,0,0,0,5H14A4.951,4.951,0,0,0,9,0Z" transform="translate(0 11)" fill="#fff" />
        </svg>
      </div>
    );
  }
};

export default UserAvatar;
