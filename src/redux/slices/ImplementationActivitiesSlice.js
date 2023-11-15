import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

// Async thunk for fetching implementation activities data
export const fetchImplementationActivities = createAsyncThunk(
  "implementationActivities/fetchImplementationActivities",
  async (_, thunkAPI) => {
    const response = await apiRequest("api/implementation-activities");
    return response;
  }
);

export const addImplementationActivity = createAsyncThunk(
  "implementationActivities/addImplementationActivity",
  async (activity) => {
    const data = await apiRequest(
      "api/implementation-activities",
      "POST",
      activity
    );
    return data;
  }
);

// Slice
const implementationActivitiesSlice = createSlice({
  name: "implementationActivities",
  initialState: {
    entities: [],
    loading: "idle",
    addingActivity: false,
    lastAddedActivity: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImplementationActivities.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchImplementationActivities.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.entities = action.payload;
      })
      .addCase(fetchImplementationActivities.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      })
      .addCase(addImplementationActivity.pending, (state) => {
        state.addingActivity = true;
      })
      .addCase(addImplementationActivity.fulfilled, (state, action) => {
        state.addingActivity = false;
        state.lastAddedActivity = action.payload;
      })
      .addCase(addImplementationActivity.rejected, (state, action) => {
        state.addingActivity = false;
        state.lastAddedActivity = null;
        state.error = action.error.message;
      });
  },
});

export default implementationActivitiesSlice.reducer;
