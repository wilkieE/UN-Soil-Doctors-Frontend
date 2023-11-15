// src/redux/projectsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest("api/projects");
      return response;
    } catch (error) {
      console.error("Error occurred: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (newProject, { rejectWithValue }) => {
    try {
      const response = await apiRequest("api/projects", "POST", newProject);
      return response;
    } catch (error) {
      console.error("Error occurred: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    entities: [],
    loading: "idle",
    message: "",
    selectedProject: null,
    selectedMonth: new Date().getMonth(),
    lastAddedProject: null, // Added state for the last added project
  },
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    selectMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.entities = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = "error";
        state.message = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.lastAddedProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = "error";
        state.message = action.payload;
        state.lastAddedProject = null;
      });
  },
});

export const { selectProject, selectMonth } = projectsSlice.actions;
export default projectsSlice.reducer;
