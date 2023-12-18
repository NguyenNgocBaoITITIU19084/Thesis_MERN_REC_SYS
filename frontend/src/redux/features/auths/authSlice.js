import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Server_url, Api_version, auth_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${auth_end_point}/`;

const initialState = {
  isAuthenticated: false,
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
export const LogOutByUser = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.delete(`${END_POINT}log-out`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("error from axios", error.response.data.message);
    return error.response.data;
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
      state.status = "idle";
    },
    successLogin(state, action) {
      state.isAuthenticated = true;
      state.error = null;
      state.status = "succeeded";
    },
    successLogOut(state, action) {
      state.isAuthenticated = false;
      state.error = null;
      state.status = "idle";
    },
  },
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
        const decoded = jwtDecode(data.accessToken);
        state.auth = {
          roles: decoded.roles,
          accessToken: data.accessToken,
          refeshToken: data.refeshToken,
        };
      })
      .addCase(LoginByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(LogOutByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(LogOutByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { clearError, successLogin, successLogOut } = authSlice.actions;
// Selector
export const selectAccessAuth = (state) => state.auth;
export const selectAuthErrorState = (state) => state.auth.auth;

export default authSlice.reducer;
