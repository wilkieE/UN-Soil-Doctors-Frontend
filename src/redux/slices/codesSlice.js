// src/redux/codesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

export const fetchCodes = createAsyncThunk("codes/fetchCodes", async (type) => {
  const data = await apiRequest(`api/codes/${type}`);
  return data;
});

export const addCode = createAsyncThunk(
  "codes/addCode",
  async ({ code, type }) => {
    const data = await apiRequest(`api/codes/${type}`, "POST", code);
    return data;
  }
);

export const deleteCode = createAsyncThunk(
  "codes/deleteCode",
  async (codeId, { dispatch, getState }) => {
    const response = await apiRequest(`api/codes/donors/${codeId}`, "DELETE");
    return { codeId, response };
  }
);

export const editCode = createAsyncThunk("codes/editCode", async (code) => {
  const data = await apiRequest(`api/codes/donors/${code.id}`, "PATCH", code);
  return data;
});

const codesSlice = createSlice({
  name: "codes",
  initialState: {
    entities: [],
    loading: "idle",
    addingCode: false,
    lastAddedCode: null,
    deletingCode: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCodes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchCodes.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.entities = action.payload;
      })
      .addCase(fetchCodes.rejected, (state) => {
        state.loading = "error";
      })
      .addCase(addCode.pending, (state) => {
        state.addingCode = true;
      })
      .addCase(addCode.fulfilled, (state, action) => {
        state.addingCode = false;
        state.lastAddedCode = action.payload;
      })
      .addCase(addCode.rejected, (state) => {
        state.addingCode = false;
        state.lastAddedCode = null;
      })
      .addCase(deleteCode.pending, (state) => {
        state.deletingCode = true;
      })
      .addCase(deleteCode.fulfilled, (state, action) => {
        state.deletingCode = false;
        state.entities = state.entities.filter(
          (code) => code.id !== action.payload.codeId
        );
      })
      .addCase(deleteCode.rejected, (state) => {
        state.deletingCode = false;
      })
      .addCase(editCode.pending, (state) => {
        state.editingCode = true;
      })
      .addCase(editCode.fulfilled, (state, action) => {
        state.editingCode = false;
        const index = state.entities.findIndex(
          (code) => code.id === action.payload.code.id
        );
        if (index !== -1) {
          state.entities[index] = action.payload.code;
        }
      })
      .addCase(editCode.rejected, (state) => {
        state.editingCode = false;
      });
  },
});

export default codesSlice.reducer;
