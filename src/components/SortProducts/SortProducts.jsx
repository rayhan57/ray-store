import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

const SortProducts = ({ sortOptions, setSortOptions }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const sortByName = () => {
    if (sortOptions.isHighestPrice) {
      return "Highest Price";
    } else if (sortOptions.isLowestPrice) {
      return "Lowest price";
    } else if (sortOptions.sortBy === "asc") {
      return "Newest";
    } else {
      return "Old";
    }
  };

  const updateSortOptions = (newOptions) => {
    setSortOptions({ ...sortOptions, ...newOptions });
    setShowDropdown(false);
  };

  const container = {
    hidden: { y: -30 },
    show: { y: 0 },
  };

  const list = {
    hidden: { y: -30 },
    show: { y: 0 },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-sm border hover:bg-green-700 hover:text-white rounded-full px-2 py-1 flex items-center gap-1"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Sort by {sortByName()} <IoIosArrowDown />
      </button>
      {showDropdown && (
        <motion.div
          className="text-sm absolute w-full bg-slate-100 rounded-lg shadow overflow-hidden mt-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <ul>
            <motion.li variants={list}>
              <button
                className="hover:bg-slate-200 w-full py-1 text-left pl-2"
                onClick={() =>
                  updateSortOptions({
                    sortBy: "asc",
                    isHighestPrice: false,
                    isLowestPrice: false,
                  })
                }
              >
                Newest
              </button>
            </motion.li>
            <motion.li variants={list}>
              <button
                className="hover:bg-slate-200 w-full py-1 text-left pl-2"
                onClick={() =>
                  updateSortOptions({
                    sortBy: "desc",
                    isHighestPrice: false,
                    isLowestPrice: false,
                  })
                }
              >
                Old
              </button>
            </motion.li>
            <motion.li variants={list}>
              <button
                className="hover:bg-slate-200 w-full py-1 text-left pl-2"
                onClick={() =>
                  updateSortOptions({
                    isHighestPrice: true,
                    isLowestPrice: false,
                  })
                }
              >
                Highest Price
              </button>
            </motion.li>
            <motion.li variants={list}>
              <button
                className="hover:bg-slate-200 w-full py-1 text-left pl-2"
                onClick={() =>
                  updateSortOptions({
                    isLowestPrice: true,
                    isHighestPrice: false,
                  })
                }
              >
                Lowest Price
              </button>
            </motion.li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SortProducts;
