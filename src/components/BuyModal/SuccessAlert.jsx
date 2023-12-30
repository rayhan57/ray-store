import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const SuccessAlert = ({ showSuccessAlert }) => {
  return (
    <>
      {showSuccessAlert && (
        <div className="absolute top-[40%] left-[20%] md:left-1/3 lg:left-[40%] bg-slate-100 rounded-lg p-4 shadow">
          <div className="text-6xl lg:text-7xl flex justify-center text-green-700 mb-4">
            <FaRegCheckCircle />
          </div>
          <h1 className="font-bold text-xl lg:text-2xl">Successful Purchase</h1>
        </div>
      )}
    </>
  );
};

export default SuccessAlert;
