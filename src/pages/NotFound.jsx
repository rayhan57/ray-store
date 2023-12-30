import React from "react";
import notFound from "../assets/img/notFound.png";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container h-screen flex justify-center items-center gap-10">
      <Navbar />
      <img src={notFound} className="w-40 lg:w-72" />
      <div className="space-y-5 lg:space-y-10 md:max-w-xs lg:max-w-sm">
        <h1 className="font-bold text-3xl lg:text-5xl text-transparent bg-gradient-to-tr from-green-500 to-green-700 bg-clip-text">
          OOPS! PAGE NOT FOUND
        </h1>
        <p className="text-sm lg:text-base">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link
          to={"/"}
          className="inline-block text-white px-3 py-1.5 rounded-md bg-green-700 hover:bg-green-600"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
