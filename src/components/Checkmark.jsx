import React from "react";

const Checkmark = ({ size }) => {
  return (
    <div className="checkmark-wrapper">
      {" "}
      <svg
        className="checkmark"
        height={size ? size : 56}
        width={size ? size : 56}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        {" "}
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />{" "}
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
};

export default Checkmark;
