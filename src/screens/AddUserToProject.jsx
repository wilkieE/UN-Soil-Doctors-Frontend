import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addUserToProject, fetchUsers } from "../redux/slices/usersSlice.js";
import AddIcon from "@mui/icons-material/Add";
import UserProjectForm from "../components/Common/UserProjectForm.jsx";

const AddUserToProject = ({ user, projects }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { lastAddedUserToProject } = useSelector((state) => state.users);
  const [addUserToProjectAttempted, setAddUserToProjectAttempted] =
    useState(false);

  const handleProjectSelect = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (addUserToProjectAttempted) {
      setIsSubmitting(false);
    }
  }, [addUserToProjectAttempted, lastAddedUserToProject]);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setAddUserToProjectAttempted(false);
    setIsSubmitting(false); // Add this line
    dispatch(fetchUsers());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddUserToProjectAttempted(true);
    setIsSubmitting(true); // Add this line
    dispatch(
      addUserToProject({
        userId: user.id,
        projectId: selectedProjectId,
      })
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          // setModalIsOpen(true);
          return alert("This feature is not yet implemented.");
        }}
        className="bg-blue-500 p-2 rounded text-white mr-2"
      >
        <AddIcon />
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
                  Add User To Project
                </h3>
                <UserProjectForm
                  projects={projects}
                  handleProjectSelect={handleProjectSelect}
                  handleSubmit={handleSubmit}
                />
                {addUserToProjectAttempted && (
                  <>
                    {lastAddedUserToProject && (
                      <p className="text-green-500">
                        User was added to the project successfully and they will
                        be able to access the project after they log out and log
                        back in.
                      </p>
                    )}
                    {!lastAddedUserToProject && (
                      <p className="text-red-500">
                        Failed to add user to the project.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserToProject;
