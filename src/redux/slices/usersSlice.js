// src/redux/usersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const data = await apiRequest("api/user");
  return data;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const data = await apiRequest("api/user", "POST", user);
  return data;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { dispatch, getState }) => {
    const response = await apiRequest(`api/user/${userId}`, "DELETE");
    // Return both userId and response
    return { userId, response };
  }
);
export const editUser = createAsyncThunk("users/editUser", async (user) => {
  console.log(user);
  const data = await apiRequest(`api/user/${user.UserID}`, "PATCH", user);
  return data;
});
export const addUserToProject = createAsyncThunk(
  "users/addUserToProject",
  async (userProject) => {
    const data = await apiRequest(
      "api/projects/addUserToProject",
      "POST",
      userProject
    );
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: "idle",
    addingUser: false,
    addingUserToProject: false,
    lastAddedUser: null,
    lastAddedUserToProject: null,
    deletingUser: false,
    editingUser: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.entities = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = "error";
      })
      .addCase(addUser.pending, (state) => {
        state.addingUser = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addingUser = false;
        state.lastAddedUser = action.payload;
      })
      .addCase(addUser.rejected, (state) => {
        state.addingUser = false;
        state.lastAddedUser = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deletingUser = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deletingUser = false;
        state.entities = state.entities.filter(
          (user) => user.id !== action.payload.userId
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.deletingUser = false;
      })
      .addCase(editUser.pending, (state) => {
        state.editingUser = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.editingUser = false;
        const index = state.entities.findIndex(
          (user) => user.id === action.payload.user.id
        );
        if (index !== -1) {
          state.entities[index] = action.payload.user;
        }
      })
      .addCase(editUser.rejected, (state) => {
        state.editingUser = false;
      })
      .addCase(addUserToProject.pending, (state) => {
        state.addingUserToProject = true;
      })
      .addCase(addUserToProject.fulfilled, (state, action) => {
        state.addingUserToProject = false;
        state.lastAddedUserToProject = action.payload;
      })
      .addCase(addUserToProject.rejected, (state) => {
        state.addingUserToProject = false;
        state.lastAddedUserToProject = null;
      });
  },
});

export default usersSlice.reducer;
