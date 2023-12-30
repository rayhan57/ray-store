import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { getCategories } from "../../libs/fetchingApi";

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
            <div className="bg-slate-50 shadow rounded-lg absolute">
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`/products/category/${category}`}
                      className="w-full block text-sm hover:bg-slate-200 p-2 text-left capitalize"
                      onClick={() => setDropdownCategories(false)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
