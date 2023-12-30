import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { DELETE_TO_CART } from "../../state/cartSlice";

const CartProducts = ({ cartProducts, setCartProducts }) => {
  const dispatch = useDispatch();

  const lessQuantity = (productId) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const addQuantity = (productId) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const deleteProduct = (productId) => {
    dispatch(DELETE_TO_CART(productId));
  };

  return (
    <>
      {cartProducts.map((product, index) => (
        <div key={index} className="px-3 md:px-5 lg:px-3">
          <div className="flex items-center gap-5 md:gap-10 p-2 border-y-2 relative">
            <div className="flex items-center gap-2 lg:gap-4 flex-1">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 lg:w-40 lg:h-40 object-contain"
              />
              <div className="space-y-1 lg:space-y-2">
                <h2 className="text-sm">{product.title}</h2>
                <p className="text-xs lg:text-sm text-slate-500">
                  Category: {product.category} <br />
                  <span className="flex items-center gap-1">
                    <FaStar /> {product.rating.rate}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <button
                className="border w-6 h-6 lg:w-8 lg:h-8 hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:bg-slate-50 disabled:hover:text-black"
                onClick={() => lessQuantity(product.id)}
                disabled={product.quantity === 1}
              >
                -
              </button>
              <h4 className="text-sm">{product.quantity}</h4>
              <button
                className="border w-6 h-6 lg:w-8 lg:h-8 hover:bg-green-700 hover:text-white"
                onClick={() => addQuantity(product.id)}
              >
                +
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-sm">
                ${product.price * product.quantity}
              </h3>
            </div>

            <button
              className="absolute bottom-2 right-2 lg:static hover:text-green-700"
              onClick={() => deleteProduct(product.id)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartProducts;
