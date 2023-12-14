import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  Server_url,
  Api_version,
  category_end_point,
} from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${category_end_point}/`;

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fecthCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get(END_POINT);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fecthCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fecthCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.categories = state.categories.concat(data);
      })
      .addCase(fecthCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector
export const selectAllCategories = (state) => state.categories.categories;
export const selectLoadingState = (state) => state.categories.status;
export const selectErrorState = (state) => state.categories.error;

export default categoriesSlice.reducer;
