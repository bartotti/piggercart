"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../config/supabaseClient";

export const fetchCartItemsAsync = createAsyncThunk(
  "cartItems/fetchCartItems",
  async () => {
    try {
      const { data } = await supabase.from(`piggerdb`).select();
      console.log("111" + data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cartItems/removeCartItem",
  async itemId => {
    try {
      const { data } = await supabase
        .from(`piggerdb`)
        .delete()
        .eq("id", itemId);
      console.log(data);
      return itemId;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cartItems/addCartItem",
  async (cartItem, thunkAPI) => {
    try {
      const { data, error } = await supabase.from("piggerdb").insert([
        {
          name: cartItem.name,
          price: cartItem.price,
          qty: cartItem.qty,
        },
      ]);
      if (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      } else {
        console.log(data);
        return data;
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateQtyAsync = createAsyncThunk(
  "cartItems/updateQty",
  async ({ itemId, newQty }) => {
    try {
      const { data } = await supabase
        .from(`piggerdb`)
        .update({ qty: newQty })
        .eq("id", itemId);
      console.log(data);
      return { itemId, newQty };
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
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      return state.filter(cartItems => cartItems.id !== action.payload.id);
    });
    builder.addCase(updateQtyAsync.fulfilled, (state, action) => {
      const { itemId, newQty } = action.payload;
      const updatedState = state.map(cartItem =>
        cartItem.id === itemId ? { ...cartItem, qty: newQty } : cartItem
      );
      return updatedState;
    });
  },
});

export const { setCartItems } = cartitemSlice.actions;
export const selectCartItems = state => {
  return state.cartItems;
};
export default cartitemSlice.reducer;
