import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { getCategories } from "../../libs/fetchingApi";
import { motion } from "framer-motion";

const ListNavbar = () => {
  const [dropdownCategories, setDropdownCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownCategories(false);
    }
  };

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const container = {
    hidden: { y: -30 },
    show: { y: 0 },
  };

  const list = {
    hidden: { y: -30 },
    show: { y: 0 },
  };

  return (
    <div className="mt-7 md:mt-0 w-max" ref={dropdownRef}>
      <ul className="md:flex md:gap-4 lg:gap-8 text-sm lg:text-base space-y-3 md:space-y-0">
        <li>
          <button
            className="flex items-center gap-1 hover:text-green-700"
            onClick={() => setDropdownCategories(!dropdownCategories)}
          >
            Categories <IoIosArrowDown />
          </button>

          {dropdownCategories && (
            <motion.div
              className="bg-slate-50 shadow rounded-lg overflow-hidden absolute"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <ul>
                {categories.map((category, index) => (
                  <motion.li key={index} variants={list}>
                    <Link
                      to={`/products/category/${category}`}
                      className="w-full block text-sm hover:bg-slate-200 p-2 text-left capitalize"
                      onClick={() => setDropdownCategories(false)}
                    >
                      {category}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </li>

        <li>
          <Link to={"/delivery"} className="hover:text-green-700">
            Delivery
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ListNavbar;
