import React from "react";
import "../../styles/LoadingSpinner.css";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner-layer layer1"></div>
        <div className="spinner-layer layer2"></div>
        <div className="spinner-layer layer3"></div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
