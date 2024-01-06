import React from "react";
import { FaStar } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../state/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProduct);

  const addToCart = (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    const productInCart = cartProducts.find((product) => product.id === id);

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

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mt-5">
        {products.map((item, index) => (
          <div key={index} className="shadow rounded-md overflow-hidden">
            <div className="border rounded-t-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-60 object-contain mx-auto"
              />
            </div>
            <div className="p-2">
              <div className="flex justify-between items-start gap-2 mt-2">
                <Link
                  to={`/product/${item.id}`}
                  className="font-semibold text-sm hover:text-green-700 hover:underline line-clamp-2"
                >
                  {item.title}
                </Link>
                <h3 className="font font-semibold">${item.price}</h3>
              </div>
              <div className="text-xs mt-1">
                <p className="line-clamp-1 mb-1">{item.description}</p>
                <span className="text-green-700 flex gap-1">
                  <FaStar /> {item.rating.rate} {`(${item.rating.count})`}
                </span>
              </div>
              <button
                className="text-sm px-2 py-1 flex items-center border border-black hover:bg-green-700 hover:text-white rounded-full mt-2"
                onClick={() => addToCart(item.id)}
              >
                <MdAddShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;
