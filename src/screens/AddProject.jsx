import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createProject, fetchProjects } from "../redux/slices/projectsSlice.js";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "../components/Common/ProjectForm.jsx";

const AddProject = () => {
  //TODO project not showing confirmation and not fetching new list
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.value.id);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [project, setProject] = useState({
    nameEnglish: "",
    namePortuguese: "",
    //TODO implement Add Ministry Functionality
    nodalImplementingMinistry: "",
    dateOfCreation: Date.now(),
    projectStartDate: "",
    projectEndDate: "",
    status: "",
    projectEditUserId: userId,
    projectEditDate: null,
    reasonForEditing: "",
  });

  const handleInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const lastAddedProject = useSelector(
    (state) => state.projects.entities[state.projects.entities.length - 1]
  );
  const [addProjectAttempted, setAddProjectAttempted] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setAddProjectAttempted(false);
    dispatch(fetchProjects());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(project));
    setAddProjectAttempted(true);
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="border border-gray-400 rounded px-4 py-2 flex items-center"
      >
        <AddIcon className="mr-2" />
        {t("addProject")}
      </button>

      {modalIsOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={handleModalClose}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <span>Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add New Project
                </h3>
                <ProjectForm
                  project={project}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  formType="Add"
                />
                {addProjectAttempted && (
                  <>
                    {lastAddedProject && (
                      <p className="text-green-500">
                        Project was added successfully.
                      </p>
                    )}{" "}
                    {!lastAddedProject && (
                      <p className="text-red-500">Failed to add project.</p>
                    )}{" "}
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={handleModalClose}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <span>Close modal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProject;
