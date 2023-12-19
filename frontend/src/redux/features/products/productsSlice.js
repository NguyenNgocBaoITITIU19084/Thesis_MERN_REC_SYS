import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Server_url, Api_version, product_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${product_end_point}/`;

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fecthProducts = createAsyncThunk(
  "products/fecthProducts",
  async () => {
    try {
      const response = await axios.get(END_POINT);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
      state.status = "idle";
    },
    clearProducts(state) {
      state.products = [];
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fecthProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fecthProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...action.payload.data];
      })
      .addCase(fecthProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearProducts } = productsSlice.actions;

// Selector
export const selectAllProducts = (state) => state.products.products;
export const selectProductsLoadingState = (state) => state.products.status;
export const selectProductsErrorState = (state) => state.products.error;

export default productsSlice.reducer;
