import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const productCount = useSelector((state) => state.cart.cartProduct);

  return (
    <>
      <div>
        <Link to={"/cart"}>
          <button className="relative flex items-center gap-2 text-sm lg:text-base hover:text-green-700">
            <FiShoppingCart /> Cart
            {productCount.length > 0 && (
              <span className="absolute flex justify-center items-center -top-2 -right-3 bg-green-700 text-xs lg:text-sm text-white w-4 h-4 rounded-full">
                {productCount.length}
              </span>
            )}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
