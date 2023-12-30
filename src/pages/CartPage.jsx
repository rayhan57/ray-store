import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CartProducts from "../components/ShoppingCart/CartProducts";
import { useSelector } from "react-redux";
import BuyModal from "../components/BuyModal/BuyModal";
import SuccessAlert from "../components/BuyModal/SuccessAlert";
import Footer from "../components/Footer";

const CartPage = () => {
  const products = useSelector((state) => state.cart.cartProduct);
  const [cartProduct, setCartProduct] = useState(products);
  const serviceFee = 20;
  const [showBuyModal, setShowModalBuy] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const calculateSubTotal = () => {
    return cartProduct.reduce(
      (acc, product) => Math.ceil(acc + product.price * product.quantity),
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubTotal() + serviceFee;
  };

  return (
    <>
      <div className="lg:container min-h-screen mt-28 md:mt-20">
        <Navbar />
        <h1 className="font-semibold text-lg lg:text-xl pb-3 px-3 md:px-5 lg:px-0">
          Shopping Cart
        </h1>
        {products.length > 0 ? (
          <>
            <div className="grid lg:grid-flow-col gap-8 ">
              <div className="space-y-3">
                <CartProducts
                  cartProducts={cartProduct}
                  setCartProducts={setCartProduct}
                />
              </div>

              <div className="bg-slate-100 p-3 shadow-md h-max">
                <h2>Order Details</h2>
                <div className="flex justify-between lg:gap-32 text-xs mt-2">
                  <p>Subtotal ({products.length} items)</p>
                  <p>${calculateSubTotal()}</p>
                </div>
                <div className="flex justify-between text-xs border-b pb-2">
                  <p>Service fee</p>
                  <p>${serviceFee}</p>
                </div>
                <div className="flex justify-between font-semibold my-2">
                  <p>Total</p>
                  <p>${calculateTotal()}</p>
                </div>
                <button
                  className="bg-green-700 hover:bg-green-600 text-white w-full py-1.5 rounded-full"
                  onClick={() => setShowModalBuy(true)}
                >
                  Buy
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center mt-5">Empty shopping cart.</p>
        )}
      </div>
      <Footer />
      <BuyModal
        cartProduct={cartProduct}
        totalPrice={calculateSubTotal()}
        showBuyModal={showBuyModal}
        setShowBuyModal={setShowModalBuy}
        setShowSuccessAlert={setShowSuccessAlert}
      />
      <SuccessAlert showSuccessAlert={showSuccessAlert} />
    </>
  );
};

export default CartPage;
