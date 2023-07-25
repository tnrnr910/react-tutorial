import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <Link
        to={"/"}
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        <FaHome
          style={{
            color: "gray",
            cursor: "pointer",
            width: "40px",
            height: "70px",
          }}
        />
      </Link>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </header>
  );
}