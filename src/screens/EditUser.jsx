import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUsers } from "../redux/slices/usersSlice.js";
import EditIcon from "@mui/icons-material/Edit";
import UserForm from "../components/Common/UserForm.jsx";

const EditUser = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    dispatch(fetchUsers());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(editedUser));
  };

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  return (
    <div>
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
        className="bg-green-500 p-2 rounded text-white mr-2"
      >
        <EditIcon />
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
              <div className="px-6 py-4 lg:px-8 text-center">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit User
                </h3>
                <UserForm
                  user={editedUser}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  formType={"Edit"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
