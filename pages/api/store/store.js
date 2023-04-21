"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartitemSlice from "./cartitemSlice";

const store = configureStore({
  reducer: {
    cartItems: cartitemSlice,
  },
});

export default store;
