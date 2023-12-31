import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Server_url, Api_version, store_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${store_end_point}/`;

const initialState = {
  store: {},
  status: "idle",
  error: null,
};

export const createStore = createAsyncThunk(
  "store/createStore",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${END_POINT}register-store`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const fetchStore = createAsyncThunk("store/fetchStore", async () => {
  try {
    const response = await axios.get(`${END_POINT}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    clearError(state) {
      state.status = "idle";
      state.error = null;
    },
    clearStoreProfile(state) {
      state.store = {};
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createStore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.store = { ...action.payload.data };
      })
      .addCase(createStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchStore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.store = { ...action.payload.data };
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearStoreProfile } = storeSlice.actions;
// Selector
export const selectStore = (state) => state.store.store;
export const selectStoreLoadingState = (state) => state.store.status;
export const selectStoreErrorState = (state) => state.store.error;

export default storeSlice.reducer;
