import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddProject from "./AddProject";
import { fetchProjects } from "../redux/slices/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

const AllProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.entities);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.message); // Get error message from redux store
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(fetchProjects()); // Dispatch your async action here
  }, [dispatch]); // include dispatch in the dependencies array

  if (loading === "loading") return "Loading...";
  if (error) return `Error: ${error}`;

  const handleEdit = (projectId) => {
    //TODO implement edit project functionality
    // handle edit functionality here
  };

  const handleDelete = (projectId) => {
    //TODO implement delete project functionality
    // handle delete functionality here
  };

  const filteredProjects = projects.filter((project) =>
    filterStatus === "all" ? true : project.status === filterStatus
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Projects</h1>
      <div className="flex w-full justify-between">
        <select
          className="text-left border border-gray-400 rounded px-4 py-2 pl-2 pr-8"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
        <AddProject />
      </div>
      <div className="relative overflow-x-auto mt-8 w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Project Name
              </th>
              <th scope="col" className="px-6 py-3">
                {filterStatus === "closed" ? "Nodal Ministry" : "Project ID"}
              </th>
              <th scope="col" className="px-6 py-3">
                {filterStatus === "closed"
                  ? "Date of Closure"
                  : "Nodal Ministry"}
              </th>
              {filterStatus !== "closed" && (
                <>
                  <th scope="col" className="px-6 py-3">
                    Date of Addition
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{project.nameEnglish}</td>
                <td className="px-6 py-4">
                  {filterStatus === "closed"
                    ? project.nodalImplementingMinistry
                    : project.id}
                </td>
                <td className="px-6 py-4">
                  {filterStatus === "closed"
                    ? new Date(project.projectEndDate).toLocaleDateString()
                    : project.nodalImplementingMinistry}
                </td>
                {filterStatus !== "closed" && (
                  <>
                    <td className="px-6 py-4">
                      {new Date(project.projectStartDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-start items-center">
                        <button
                          className="bg-green-500 p-2 rounded text-white mr-2"
                          onClick={() => handleEdit(project.id)}
                        >
                          <EditIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3" />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded text-white"
                          onClick={() => handleDelete(project.id)}
                        >
                          <ClearIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProjects;
