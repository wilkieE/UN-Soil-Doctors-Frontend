import { useState } from "react";

const UserProjectForm = ({ projects, handleProjectSelect, handleSubmit }) => {
  const [selectedProject, setSelectedProject] = useState("");

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
    handleProjectSelect(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label
        htmlFor="projects"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select Project
      </label>
      <select
        id="projects"
        value={selectedProject}
        onChange={handleSelectChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select a project...</option>
        {projects.map((project, index) => (
          <option key={index} value={project.id}>
            {project.nameEnglish}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add User to Project
      </button>
    </form>
  );
};

export default UserProjectForm;
