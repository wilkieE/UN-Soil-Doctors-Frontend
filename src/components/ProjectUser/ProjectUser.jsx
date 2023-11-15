// src/components/ProjectUser/ProjectUser.js
import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/api";

function ProjectUser() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest("api/projects")
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-6 p-4 bg-white rounded shadow-sm">
          <h3 className="text-xl font-semibold">{project.nameEnglish}</h3>
          <h4 className="text-lg">{project.namePortuguese}</h4>
          <p className="text-gray-600">Status: {project.status}</p>
          <p className="text-gray-600">
            Start Date:{" "}
            {new Date(project.projectStartDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            End Date: {new Date(project.projectEndDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectUser;
