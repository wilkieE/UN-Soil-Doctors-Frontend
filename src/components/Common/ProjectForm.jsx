import React from "react";
import FormField from "./FormField";

const ProjectForm = ({
  project,
  handleInputChange,
  handleSubmit,
  formType,
}) => {
  const fieldData = [
    {
      label: "Name (English)",
      type: "text",
      name: "nameEnglish",
      required: true,
    },
    {
      label: "Name (Portuguese)",
      type: "text",
      name: "namePortuguese",
      required: true,
    },
    {
      label: "Nodal Implementing Ministry",
      type: "number",
      name: "nodalImplementingMinistry",
      required: true,
    },
    {
      label: "Project Start Date",
      type: "date",
      name: "projectStartDate",
      required: true,
    },
    {
      label: "Project End Date",
      type: "date",
      name: "projectEndDate",
      required: true,
    },
    { label: "Status", type: "text", name: "status", required: true },
  ];

  // Conditionally divide fieldData into two arrays
  let fieldData1, fieldData2;
  const maxFieldsPerColumn = 6;

  if (fieldData.length > maxFieldsPerColumn) {
    fieldData1 = fieldData.slice(0, Math.ceil(fieldData.length / 2));
    fieldData2 = fieldData.slice(Math.ceil(fieldData.length / 2));
  } else {
    fieldData1 = fieldData;
    fieldData2 = [];
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div
        className={`flex space-x-4 mb-4 ${
          fieldData2.length > 0 ? "" : "justify-center"
        }`}
      >
        <div className={`space-y-2 ${fieldData2.length > 0 ? "" : "w-full"}`}>
          {fieldData1.map((field, index) => (
            <FormField
              key={index}
              value={project && project[field.name]}
              {...field}
              handleInputChange={handleInputChange}
            />
          ))}
        </div>
        {fieldData2.length > 0 && (
          <div className="w-1/2 space-y-2">
            {fieldData2.map((field, index) => (
              <FormField
                key={index}
                value={project && project[field.name]}
                {...field}
                handleInputChange={handleInputChange}
              />
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {formType} Project
      </button>
    </form>
  );
};

export default ProjectForm;
