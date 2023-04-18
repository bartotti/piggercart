"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartitemSlice from "./cartitemSlice";

const store = configureStore({
  reducer: {
    cartitem: cartitemSlice,
  },
});

export default store;
