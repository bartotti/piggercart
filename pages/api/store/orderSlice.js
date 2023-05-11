import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../config/supabaseClient";

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async ({ orderList }, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("order")
        .insert({ orderList });
      if (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const searchOrderAsync = createAsyncThunk(
  "order/searchOrder",
  async (orderId, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("order")
        .select("orderList")
        .eq("id", orderId)
        .single();
      if (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      return data.orderList;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(searchOrderAsync.fulfilled, (state, action) => {
      const data = JSON.parse(action.payload);
      const item_data = data.map(item => {
        return {
          name: item.name,
          price: item.price,
          qty: item.qty,
        };
      });
      return item_data;
    });
  },
});

export const { setOrderItems } = orderSlice.actions;
export const selectOrder = state => {
  return state.order;
};
export default orderSlice.reducer;
