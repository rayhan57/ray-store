import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SortProducts from "../components/SortProducts/SortProducts";
import { useParams } from "react-router-dom";
import Products from "../components/Products/Products";
import { getProductsByCategory } from "../libs/fetchingApi";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOptions, setShortOptions] = useState({
    sortBy: "asc",
    isHighestPrice: false,
    isLowestPrice: false,
  });

  useEffect(() => {
    getProductsByCategory(category, sortOptions.sortBy).then((result) => {
      if (sortOptions.isHighestPrice) {
        setProducts(result.sort((a, b) => b.price - a.price));
      } else if (sortOptions.isLowestPrice) {
        setProducts(result.sort((a, b) => a.price - b.price));
      } else {
        setProducts(result);
      }
    });
  }, [category, sortOptions]);

  return (
    <>
      <div className="container min-h-screen py-1">
        <Navbar />

        {products.length > 0 ? (
          <>
            <div className="mt-28 md:mt-24 flex justify-between items-center">
              <h1 className="text-base lg:text-xl font-semibold capitalize">
                {category} Category
              </h1>
              <SortProducts
                sortOptions={sortOptions}
                setSortOptions={setShortOptions}
              />
            </div>

            <Products products={products} />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
