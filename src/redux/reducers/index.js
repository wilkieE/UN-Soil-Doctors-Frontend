import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import languageReducer from "../slices/languageSlice";
import userProjectsReducer from "../slices/promotersSlice";
import projectUsersSlice from "../slices/projectUsersSlice";
import usersSlice from "../slices/usersSlice";
import projectsSlice from "../slices/projectsSlice";
import projectReportsSlice from "../slices/projectReportsSlice";
import expenditureTableDataReducer from "../slices/expenditureTableDataSlice";
import disbursementTableDataSlice from "../slices/disbursementTableDataSlice";
import codesSlice from "../slices/codesSlice";
import promotersSlice from "../slices/promotersSlice";
import ImplementationActivitiesSlice from "../slices/ImplementationActivitiesSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  language: languageReducer,
  userProjects: userProjectsReducer,
  projectUsers: projectUsersSlice,
  users: usersSlice,
  projects: projectsSlice,
  projectReports: projectReportsSlice,
  expenditureTableData: expenditureTableDataReducer,
  disbursementTableData: disbursementTableDataSlice,
  codes: codesSlice,
  promoters: promotersSlice,
  implementationActivities: ImplementationActivitiesSlice,
});

export default rootReducer;
