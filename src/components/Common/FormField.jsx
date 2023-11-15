import React from "react";

const FormField = ({
  label,
  type,
  name,
  value,
  handleInputChange,
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value || ""}
      onChange={handleInputChange}
      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      required={required}
    />
  </div>
);

export default FormField;
