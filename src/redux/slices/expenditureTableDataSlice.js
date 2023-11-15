import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const expenditureTableDataSlice = createSlice({
  name: "expenditureTableData",
  initialState,
  reducers: {
    setExpenditureTableData(state, action) {
      state.data = action.payload;
    },
    clearExpenditureTableData(state) {
      state.data = [];
    },
  },
});

export const { setExpenditureTableData, clearExpenditureTableData } =
  expenditureTableDataSlice.actions;

export default expenditureTableDataSlice.reducer;
