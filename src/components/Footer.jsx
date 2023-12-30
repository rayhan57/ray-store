import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-green-700 p-2 mt-5">
      <p className="text-center text-white text-sm">
        Copyright ©2023{" "}
        <Link to={"/"} className="text-slate-300 hover:text-slate-100">
          RayStore
        </Link>
      </p>
    </div>
  );
};

export default Footer;
