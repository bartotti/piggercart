"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartitemSlice from "./cartitemSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    cartItems: cartitemSlice,
    order: orderSlice,
  },
});

export default store;
