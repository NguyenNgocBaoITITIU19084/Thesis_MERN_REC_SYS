import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  Server_url,
  Api_version,
  discount_end_point,
} from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${discount_end_point}/`;

const initialState = {
  discounts: [],
  status: "idle",
  error: null,
};

export const fecthDiscounts = createAsyncThunk(
  "discounts/fecthDiscounts",
  async () => {
    try {
      const response = await axios.get(END_POINT);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    clearError(state) {
      state.status = "idle";
      state.error = null;
    },
    clearDiscountList(state) {
      state.discounts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fecthDiscounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fecthDiscounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.discounts = [...action.payload.data];
      })
      .addCase(fecthDiscounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearDiscountList, clearError } = discountsSlice.actions;

// Selector
export const selectAllDiscounts = (state) => state.discounts.discounts;
export const selectDiscountState = (state) => state.discounts.status;
export const selectDiscountError = (state) => state.discounts.error;

export default discountsSlice.reducer;
