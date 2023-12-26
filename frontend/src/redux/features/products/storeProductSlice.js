import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Server_url, Api_version, product_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${product_end_point}/`;

const initialState = {
  storeProduct: [],
  status: "idle",
  error: null,
};

export const deleteProductById = createAsyncThunk(
  "storeProducts/deleteProductById",
  async (id) => {
    try {
      const response = await axios.delete(`${END_POINT}${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fecthProductsByStoreSide = createAsyncThunk(
  "storeProducts/fecthProductsByStoreSide",
  async () => {
    try {
      const response = await axios.get(`${END_POINT}store-side`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const storeProductsSlice = createSlice({
  name: "storeProduct",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
      state.status = "idle";
    },
    clearStoreProduct(state) {
      state.storeProduct = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fecthProductsByStoreSide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fecthProductsByStoreSide.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.storeProduct = [...action.payload.data];
      })
      .addCase(fecthProductsByStoreSide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductById.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearStoreProduct } = storeProductsSlice.actions;

// Selector
export const selectAllProductsStore = (state) =>
  state.storeProduct.storeProduct;
export const selectStoreProductsLoadingState = (state) =>
  state.storeProduct.status;
export const selectStoreProductsErrorState = (state) =>
  state.storeProduct.error;

export default storeProductsSlice.reducer;
