import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Products from "../components/Products/Products";
import SortProducts from "../components/SortProducts/SortProducts";
import { getProducts } from "../libs/fetchingApi";
import Loading from "../components/Loading";

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOptions, setShortOptions] = useState({
    sortBy: "asc",
    isHighestPrice: false,
    isLowestPrice: false,
  });

  const searchProductByKeyword = () => {
    const searchProduct = products.filter((product) =>
      product.title.toLowerCase().includes(keyword)
    );
    if (sortOptions.isHighestPrice) {
      return searchProduct.sort((a, b) => b.price - a.price);
    } else if (sortOptions.isLowestPrice) {
      return searchProduct.sort((a, b) => a.price - b.price);
    } else {
      return searchProduct;
    }
  };

  useEffect(() => {
    getProducts(sortOptions.sortBy).then((result) => setProducts(result));
  }, [sortOptions]);

  return (
    <div className="container py-1">
      <Navbar />

      {products.length > 0 ? (
        <>
          <div className="mt-28 md:mt-24 flex justify-between items-center">
            <h1 className="text-lg lg:text-xl font-semibold">
              Search results for: {keyword}
            </h1>
            <SortProducts
              sortOptions={sortOptions}
              setSortOptions={setShortOptions}
            />
          </div>

          {searchProductByKeyword().length === 0 ? (
            <h1 className="text-center mt-10">{keyword} not found.</h1>
          ) : (
            <Products products={searchProductByKeyword()} />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SearchPage;
