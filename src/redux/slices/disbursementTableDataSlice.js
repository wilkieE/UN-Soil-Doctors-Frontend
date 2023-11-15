import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const disbursementTableDataSlice = createSlice({
  name: "disbursementTableData",
  initialState,
  reducers: {
    setDisbursementTableData(state, action) {
      state.data = action.payload;
    },
    clearDisbursementTableData(state) {
      state.data = [];
    },
  },
});

export const { setDisbursementTableData, clearDisbursementTableData } =
  disbursementTableDataSlice.actions;

export default disbursementTableDataSlice.reducer;
