import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProduct: [],
    orderDetails: {},
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      state.cartProduct = [...state.cartProduct, action.payload];
    },
    DELETE_TO_CART: (state, action) => {
      state.cartProduct = state.cartProduct.filter(
        (product) => product.id !== action.payload
      );
    },
    RESET_CART: (state) => {
      state.cartProduct = [];
    },
    SET_ORDER_DETAILS: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});

export const { ADD_TO_CART, DELETE_TO_CART, RESET_CART, SET_ORDER_DETAILS } =
  cartSlice.actions;

export default cartSlice.reducer;
