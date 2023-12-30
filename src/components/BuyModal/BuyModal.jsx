import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_CART, SET_ORDER_DETAILS } from "../../state/cartSlice";
import { format } from "date-fns";

const BuyModal = ({
  cartProduct,
  totalPrice,
  showBuyModal,
  setShowBuyModal,
  setShowSuccessAlert,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    cartProduct: null,
    totalPrice: null,
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const orderNo = Math.floor(100000000000 + Math.random() * 900000000000);
  const currentDate = new Date();
  const orderDate = format(currentDate, "MMMM, dd yyyy");
  const deliveryDate = format(
    currentDate.setDate(currentDate.getDate() + 1),
    "MMMM, dd yyyy"
  );

  useEffect(() => {
    setFormData({
      cartProduct: cartProduct,
      totalPrice: totalPrice,
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    });
  }, [cartProduct, totalPrice]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        (result) => {
          setShowSuccessAlert(true);
          dispatch(
            SET_ORDER_DETAILS({
              cartProduct,
              orderNo,
              orderDate,
              deliveryDate,
              totalPrice,
            })
          );
          dispatch(RESET_CART());
          setTimeout(() => {
            navigate("/delivery");
          }, 3000);
        },
        (error) => {
          console.error("Email sending failed:", error);
        }
      );
    setShowBuyModal(false);
  };

  return (
    <>
      {showBuyModal && (
        <div className="absolute top-0 md:left-1/4 lg:left-1/3 lg:top-20 z-20 p-4 w-full max-w-md max-h-full">
          <div className="relative bg-slate-100 rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="font-semibold">Order Detail</h3>
              <button
                className="bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                onClick={() => setShowBuyModal(false)}
              >
                <IoMdClose />
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-slate-300 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 "
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="border border-slate-300 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
                    placeholder="eg: 082134861305"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border border-slate-300 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 "
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium "
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="border border-slate-300 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
                    placeholder="Your address"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <button className="text-white bg-green-700 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Buy
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyModal;
