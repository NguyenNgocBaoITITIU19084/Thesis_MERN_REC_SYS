import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Server_url, Api_version, brand_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${brand_end_point}/`;

const initialState = {
  brands: [],
  status: "idle",
  error: null,
};

export const fecthBrands = createAsyncThunk("brands/fetchBrands", async () => {
  try {
    const response = await axios.get(END_POINT);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fecthBrands.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fecthBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.brands = state.brands.concat(data);
      })
      .addCase(fecthBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector
export const selectAllBrands = (state) => state.brands.brands;
export const selectBrandLoadingState = (state) => state.brands.status;
export const selectBrandErrorState = (state) => state.brands.error;

export default brandsSlice.reducer;
