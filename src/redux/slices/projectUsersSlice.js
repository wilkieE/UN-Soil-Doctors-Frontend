// src/redux/projectUsersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

export const fetchProjectUsers = createAsyncThunk(
  "projectUsers/fetchProjectUsers",
  async (projectId) => {
    const data = await apiRequest(`api/projects/${projectId}/users`);
    return data;
  }
);

const projectUsersSlice = createSlice({
  name: "projectUsers",
  initialState: { entities: [], loading: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectUsers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchProjectUsers.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.entities = action.payload;
      })
      .addCase(fetchProjectUsers.rejected, (state) => {
        state.loading = "error";
      });
  },
});

export default projectUsersSlice.reducer;
