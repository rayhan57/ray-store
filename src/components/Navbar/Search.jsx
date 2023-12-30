import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getProducts } from "../../libs/fetchingApi";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [suggestionBox, setSuggestionBox] = useState(false);
  const [populerCategories, setPopulerCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [jewelery, setJewelery] = useState([]);
  const [menClothing, setMenClothing] = useState([]);
  const [womenClothing, setWomenClothing] = useState([]);
  const suggestionBoxRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    navigate(`/products/search/${searchValue}`);
  };

  const closeSuggestionBox = (e) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(e.target)
    ) {
      setSuggestionBox(false);
    }
  };

  const filterProductByCategory = () => {
    setElectronics(
      products.filter((product) => product.category === "electronics")
    );
    setJewelery(products.filter((product) => product.category === "jewelery"));
    setMenClothing(
      products.filter((product) => product.category === "men's clothing")
    );
    setWomenClothing(
      products.filter((product) => product.category === "women's clothing")
    );
  };

  const imagesPerCategory = (category) => {
    if (category === "electronics") {
      return electronics[0]?.image;
    } else if (category === "jewelery") {
      return jewelery[0]?.image;
    } else if (category === "men's clothing") {
      return menClothing[0]?.image;
    } else {
      return womenClothing[0]?.image;
    }
  };

  const itemsPerCategory = (category) => {
    if (category === "electronics") {
      return electronics.length;
    } else if (category === "jewelery") {
      return jewelery.length;
    } else if (category === "men's clothing") {
      return menClothing.length;
    } else {
      return womenClothing.length;
    }
  };

  useEffect(() => {
    getProducts().then((result) => setProducts(result));
    filterProductByCategory();
    getCategories().then((result) => setPopulerCategories(result));

    document.addEventListener("click", closeSuggestionBox);
    return () => {
      document.removeEventListener("click", closeSuggestionBox);
    };
  }, [suggestionBox]);

  return (
    <div ref={suggestionBoxRef}>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 rounded-full px-2 flex justify-between items-center"
        onClick={() => setSuggestionBox(!suggestionBox)}
      >
        <input
          id="search"
          type="text"
          className="bg-transparent flex-1 border-0 focus:border-0 focus:ring-0 text-sm lg:text-base"
          placeholder="Search Product"
          autoComplete="off"
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        <button className="text-base lg:text-lg mr-2" onClick={handleSubmit}>
          <IoIosSearch />
        </button>
      </form>

      {suggestionBox && (
        <div className=" bg-slate-100 rounded-lg absolute md:-ml-16 shadow-md mt-1 p-3">
          <h2 className="text-sm lg:text-base border-b-2 pb-2">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {populerCategories.map((category, index) => (
              <Link
                key={index}
                to={`/products/category/${category}`}
                className="bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2 p-1 text-start"
              >
                <img
                  src={imagesPerCategory(category)}
                  alt={category}
                  className="w-10"
                />
                <div>
                  <h4 className="text-sm capitalize">{category}</h4>
                  <p className="text-[10px] lg:text-xs">
                    {itemsPerCategory(category)} Items Available
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
