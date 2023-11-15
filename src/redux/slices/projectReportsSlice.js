import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

export const fetchProjectReports = createAsyncThunk(
  "projectReports/fetchProjectReports",
  async () => {
    const response = await apiRequest("api/reports");
    return response;
  }
);

const projectReportsSlice = createSlice({
  name: "projectReports",
  initialState: { entities: [], loading: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectReports.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchProjectReports.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = "idle";
      })
      .addCase(fetchProjectReports.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  },
});

export default projectReportsSlice.reducer;
