import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Server_url, Api_version, profile_end_point } from "../../../Server.js";

const END_POINT = `${Server_url}${Api_version}${profile_end_point}/`;

const initialState = {
  profile: {},
  status: "idle",
  error: null,
};

export const fetchProfileByUser = createAsyncThunk(
  "profile/fetchProfileByUser",
  async (accessToken) => {
    try {
      const response = await axios.get(END_POINT, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (accessToken, data) => {
    try {
      const response = await axios.patch(`${END_POINT}update-profile`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state, action) {
      state.profile = action.payload;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileByUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfileByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.profile = { ...data };
      })
      .addCase(fetchProfileByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.profile = { ...data };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { clearProfile } = profileSlice.actions;
// Selector
export const selectProfile = (state) => state.profile.profile;
export const selectProfileLoadingState = (state) => state.profile.status;
export const selectProfileErrorState = (state) => state.profile.error;

export default profileSlice.reducer;
