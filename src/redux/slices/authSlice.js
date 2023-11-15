import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    logoutUser: (state) => {
      state.value = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
