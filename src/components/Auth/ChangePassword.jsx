import React, { useState } from "react";
import apiRequest from "../../utils/api";
import FormField from "../Common/FormField";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await apiRequest("api/auth/change-password", "PUT", {
        oldPassword,
        newPassword,
      });

      setMessage(result.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="font-bold text-3xl mb-12">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Old Password"
          type="password"
          name="old-password"
          value={oldPassword}
          handleInputChange={(e) => setOldPassword(e.target.value)}
          required={true}
        />
        <FormField
          label="New Password"
          type="password"
          name="new-password"
          value={newPassword}
          handleInputChange={(e) => setNewPassword(e.target.value)}
          required={true}
        />
        <button
          type="submit"
          className="w-full text-white bg-gbBlack hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Change Password
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
