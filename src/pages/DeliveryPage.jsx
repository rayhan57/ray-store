import React from "react";
import Navbar from "../components/Navbar/Navbar";
import OrderProducts from "../components/OrderDelivery/OrderProducts";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const DeliveryPage = () => {
  const orderDetails = useSelector((state) => state.cart.orderDetails);

  return (
    <>
      <div className="container min-h-screen">
        <Navbar />
        <div className="mt-28 md:mt-24">
          <h1 className="font-bold text-xl border-b-2 pb-3">Order Delivery</h1>
          {orderDetails.cartProduct ? (
            <>
              <h2 className="font-semibold mt-3">Current Orders</h2>
              <div className="border rounded-lg mt-3 p-2 lg:p-4">
                <OrderProducts orderDetails={orderDetails} />
              </div>
            </>
          ) : (
            <p className="mt-3 text-center">No orders</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeliveryPage;
