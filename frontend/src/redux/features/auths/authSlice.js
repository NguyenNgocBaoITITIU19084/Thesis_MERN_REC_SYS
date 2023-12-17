import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Server_url, Api_version, auth_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${auth_end_point}/`;

const initialState = {
  auth: [],
  status: "idle",
  error: null,
};

export const registerNewUser = createAsyncThunk(
  "auth/registerNewUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${END_POINT}register`, credentials);
      return response.data;
    } catch (error) {
      console.log("error from axios", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const LoginByUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${END_POINT}login`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("error from axios", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.auth = state.auth.concat(data);
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(LoginByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.auth = data;
      })
      .addCase(LoginByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

// Selector
export const selectAccessAuth = (state) => state.auth.auth;
// export const selectBrandLoadingState = (state) => state.auth.auth;
export const selectAuthErrorState = (state) => state.auth.auth;

export default authSlice.reducer;
