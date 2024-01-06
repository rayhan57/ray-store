import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-green-700 p-2">
      <p className="text-center text-white text-sm">
        Copyright ©2023{" "}
        <button
          className="text-slate-300 hover:text-slate-100"
          onClick={handleClick}
        >
          RayStore
        </button>
      </p>
    </div>
  );
};

export default Footer;
