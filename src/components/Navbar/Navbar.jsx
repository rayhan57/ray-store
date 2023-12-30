import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";
import Search from "./Search";
import Cart from "./Cart";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import ListNavbar from "./ListNavbar";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <>
      <nav className="bg-white w-full fixed z-20 top-0 left-0 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-green-700 font-bold text-xl lg:text-2xl"
          >
            <img src={logo} className="w-8 lg:w-10" /> RayStore
          </Link>

          <div className="md:order-3 flex items-center space-x-3">
            <Cart />
            <button
              className="text-lg md:hidden"
              onClick={() => setShowNavbar(!showNavbar)}
            >
              <FaBarsStaggered />
            </button>
          </div>

          <div
            className={`md:order-1 bg-slate-100 shadow-md ${
              showNavbar ? "translate-x-0" : "translate-x-full md:translate-x-0"
            } transition absolute top-0 right-0 h-screen w-[70%] p-3 md:static md:h-auto md:bg-transparent md:shadow-none md:flex md:w-auto`}
          >
            <button
              className="md:hidden text-xl float-right"
              onClick={() => setShowNavbar(!showNavbar)}
            >
              <IoMdClose />
            </button>
            <ListNavbar />
          </div>

          <div className="md:order-2 w-full md:w-auto mt-2 md:mt-0">
            <Search />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
