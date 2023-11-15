import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

// Async thunk for fetching promoters data
export const fetchPromoters = createAsyncThunk(
  "promoters/fetchPromoters",
  async (_, thunkAPI) => {
    const response = await apiRequest("api/promoters");
    console.log(response);
    return response;
  }
);

export const addPromoter = createAsyncThunk(
  "promoters/addPromoter",
  async (promoter) => {
    const data = await apiRequest("api/promoters", "POST", promoter); // Adjust URL as necessary
    return data;
  }
);

// Slice
const promotersSlice = createSlice({
  name: "promoters",
  initialState: {
    entities: [],
    loading: "idle",
    addingPromoter: false,
    lastAddedPromoter: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoters.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchPromoters.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.entities = action.payload;
      })
      .addCase(fetchPromoters.rejected, (state) => {
        state.loading = "error";
      })
      .addCase(addPromoter.pending, (state) => {
        state.addingPromoter = true;
      })
      .addCase(addPromoter.fulfilled, (state, action) => {
        state.addingPromoter = false;
        state.lastAddedPromoter = action.payload;
      })
      .addCase(addPromoter.rejected, (state) => {
        state.addingPromoter = false;
        state.lastAddedPromoter = null;
      });
  },
});

export default promotersSlice.reducer;
