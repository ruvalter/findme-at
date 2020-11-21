import React from "react";
import { FaEllipsisV } from "react-icons/fa";

const AdminLink = ({ link, handleDrag }) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        borderRadius: "5px",
        maxWidth: "40rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        {...handleDrag}
      >
        <FaEllipsisV />
      </div>
      <div style={{ width: "90%" }}>
        <h4> {link.name} </h4>
        <p
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {link.url}
        </p>
        <div>tools</div>
      </div>
    </div>
  );
};

export default AdminLink;
