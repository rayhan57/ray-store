import React from "react";

const OrderProducts = ({ orderDetails }) => {
  const orderProduct = orderDetails.cartProduct;
  const orderNo = orderDetails.orderNo;
  const totalPrice = orderDetails.totalPrice;
  const orderDate = orderDetails.orderDate;
  const deliveryDate = orderDetails.deliveryDate;

  return (
    <>
      {orderProduct.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-2 mb-3"
        >
          <img src={item.image} alt={item.title} className="w-20 lg:w-28" />
          <div className="flex justify-between items-center border-b-2 py-2 flex-1">
            <div className="text-slate-500 text-xs lg:text-sm">
              <h2 className="font-semibold text-black text-sm">{item.title}</h2>
              <p>Category: {item.category}</p>
              <p>Amount: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
            <h2 className="font-semibold text-sm lg:text-base">
              ${item.price * item.quantity}
            </h2>
          </div>
        </div>
      ))}

      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 text-slate-300 text-xs lg:text-sm">
        <p>
          Order No <br />
          <span className="text-black font-semibold">{orderNo}</span>
        </p>
        <p>
          Order Date <br />
          <span className="text-black font-semibold">{orderDate}</span>
        </p>
        <p>
          Estimated Delivery <br />
          <span className="text-black font-semibold">{deliveryDate}</span>
        </p>
        <p>
          Total Payment <br />
          <span className="text-black font-semibold">${totalPrice}</span>
        </p>
      </div>
    </>
  );
};

export default OrderProducts;
