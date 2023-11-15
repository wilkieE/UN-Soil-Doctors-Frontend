import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

// Async thunk for sending the report data
export const sendReportData = createAsyncThunk(
  "report/sendReportData",
  async (reportData) => {
    const data = await apiRequest("api/reports", "POST", reportData);
    return data;
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState: { entities: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendReportData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(sendReportData.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entities.push(action.payload);
      })
      .addCase(sendReportData.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
