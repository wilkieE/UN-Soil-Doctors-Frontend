import React from "react";
import FormField from "./FormField";

const UserForm = ({ user, handleInputChange, handleSubmit, formType }) => {
  const isEditForm = formType === "Edit";

  const fieldData = [
    {
      label: "Email Address",
      type: "email",
      name: "EmailAddress",
      required: !isEditForm,
    },
    {
      label: "Password",
      type: "password",
      name: "Password",
      required: !isEditForm,
    },
    {
      label: "Username",
      type: "text",
      name: "Username",
      required: !isEditForm,
    },
    {
      label: "First Name",
      type: "text",
      name: "FirstName",
      required: !isEditForm,
    },
    {
      label: "Last Name",
      type: "text",
      name: "LastName",
      required: !isEditForm,
    },
    {
      label: "User Role",
      type: "select",
      name: "UserRole",
      options: ["Admin", "User"],
      required: !isEditForm,
    },
    {
      label: "Country ID",
      type: "number",
      name: "CountryID",
      required: !isEditForm,
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-0">
        {fieldData.map((field, index) => {
          if (field.type === "select") {
            return (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                <select
                  name={field.name}
                  id={field.name}
                  value={user && user[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select an option...</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          return (
            <FormField
              key={index}
              value={user && user[field.name]}
              {...field}
              handleInputChange={handleInputChange}
            />
          );
        })}
        <button
          type="submit"
          className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {formType} User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
