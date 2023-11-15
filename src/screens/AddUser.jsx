import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../redux/slices/usersSlice.js";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "../components/Common/UserForm.jsx";

const AddUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState({
    EmailAddress: "",
    Password: "",
    Username: "",
    UserRole: "User",
    CountryID: 1,
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const lastAddedUser = useSelector((state) => state.users.lastAddedUser);
  const [addUserAttempted, setAddUserAttempted] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setAddUserAttempted(false);
    dispatch(fetchUsers());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(user));
    setAddUserAttempted(true);
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="border border-gray-400 rounded px-4 py-2 flex items-center"
      >
        <AddIcon className="mr-2" />
        {t("Add User")}
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
              <div className="px-6 py-4 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add New User
                </h3>
                <UserForm
                  user={user}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  formType="Add"
                />
                {addUserAttempted && (
                  <>
                    {lastAddedUser && (
                      <p className="text-green-500">
                        User was added successfully.
                      </p>
                    )}{" "}
                    {!lastAddedUser && (
                      <p className="text-red-500">Failed to add user.</p>
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

export default AddUser;
