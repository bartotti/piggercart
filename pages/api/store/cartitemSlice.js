"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../config/supabaseClient";

export const fetchCartItemsAsync = createAsyncThunk(
  "cartItems/fetchCartItems",
  async () => {
    try {
      const { data } = await supabase.from(`piggerdb`)
      .select();
      console.log("111" + data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const cartitemSlice = createSlice({
  name: "cartItems",
  initialState: [],
  reducers: { displayCartItems: (state, action) => {} },
  extraReducers: builder => {
    builder.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setCartItems } = cartitemSlice.actions;
export const selectCartItems = state => {
  return state.cartItems;
};
export default cartitemSlice.reducer;
