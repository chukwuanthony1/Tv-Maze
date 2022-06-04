import React from "react";
import "./style.scss";

const LoadingComponent :React.FC<{height? : string, width? :string}> = (props) => {
  const { height, width} = props
  return (
    <div style={{height : height, width: width}} className="loading-component-wrapper">
      <div className="loading-component">
        <div className="dot-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
