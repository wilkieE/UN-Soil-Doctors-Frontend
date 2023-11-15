import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../utils/api";
import ClearIcon from "@mui/icons-material/Clear";
import AddUser from "./AddUser.jsx";
import EditUser from "./EditUser.jsx";

const Users = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("idle");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    setLoadingStatus("loading");
    apiRequest("api/user")
      .then((data) => {
        setUsers(data);
        setLoadingStatus("idle");
      })
      .catch((error) => {
        console.error("Error fetching users:", error.response.status);
        setLoadingStatus("error");
      });
  }, []);

  const handleDelete = (userId) => {
    // Implement delete functionality using API request
  };

  const filteredUsers = users.filter((user) =>
    filterRole === "" ? true : user.UserRole === filterRole
  );

  if (loadingStatus === "loading") return <div>{t("loading")}</div>;
  if (loadingStatus === "error") return <div>{t("error")}</div>;

  return (
    <div className="w-full flex flex-col ">
      <h1 className="text-2xl font-semibold mb-4">{t("users")}</h1>
      <div className="flex w-full justify-between">
        <select
          className="text-left border border-gray-400 rounded px-4 py-2 pl-2 pr-8"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">{t("All Users")}</option>
          <option value="Admin">{t("Admin")}</option>
          <option value="User">{t("User")}</option>
        </select>
        <AddUser />
      </div>
      <div className="relative overflow-x-auto mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("email")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("type")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.UserID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {`${user.FirstName} ${user.LastName}`}
                </th>
                <td className="px-6 py-4">{user.EmailAddress}</td>
                <td className="px-6 py-4">{user.UserRole}</td>
                <td className="px-6 py-4">
                  <div className="flex justify- items-center">
                    <EditUser user={user} />
                    <button
                      className="bg-red-500 p-2 rounded text-white"
                      onClick={() => handleDelete(user.UserID)}
                    >
                      <ClearIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
