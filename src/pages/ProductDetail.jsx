import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { getProducts } from "../libs/fetchingApi";
import { FaStar } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../state/cartSlice";
import { ToastContainer, toast } from "react-toastify";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProduct);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const addToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    const productInCart = cartProducts.find(
      (product) => product.id === productId
    );

    if (productInCart) {
      return;
    } else {
      const updateProduct = { ...selectedProduct, quantity: 1 };
      dispatch(ADD_TO_CART(updateProduct));
      toast.success("Added to shopping cart", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result);
      const productDetail = result.find((product) => product.id == id);
      setProduct(productDetail);
    });
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        <div className="mt-28 md:mt-[74px] h-screen flex flex-col md:flex-row">
          <div className="flex justify-center items-center flex-1">
            <img
              src={product.image}
              alt={product.title}
              className="w-48 lg:w-96"
            />
          </div>

          <div className="max-w-lg bg-slate-100 flex justify-center items-start flex-col px-10 py-5">
            <h4 className="capitalize text-sm lg:text-base">
              {product.category}
            </h4>
            <h1 className="text-lg lg:text-2xl font-semibold mt-1 lg:mt-2">
              {product.title}
            </h1>
            <span className="text-green-700 text-sm flex items-center gap-1">
              <FaStar /> {product.rating?.rate} {`(${product.rating?.count})`}
            </span>
            <p className="text-xs lg:text-sm text-slate-500 mt-3">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between w-full">
              <h4 className="font-semibold">${product.price}</h4>
              <button
                className="flex items-center bg-green-700 hover:bg-green-600 text-white py-1.5 px-3 rounded-full text-sm"
                onClick={() => addToCart(product.id)}
              >
                <MdAddShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetail;
