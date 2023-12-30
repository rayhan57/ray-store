import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SyncLoader color="#15803d" />
    </div>
  );
};

export default Loading;
