import React, { useEffect, useState } from "react";
import Table from "../components/Common/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMonth, selectProject } from "../redux/slices/projectsSlice";
import { setExpenditureTableData } from "../redux/slices/expenditureTableDataSlice";

const ExpenditureCapture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value);

  const [selectedProject, setSelectedProject] = useState(0);

  if (!user.projects || user.projects.length === 0) {
    return (
      <p>
        The user has not been added to a project yet and cannot create a report. try logging out and logging back in again if the user was recently added
      </p>
    );
  }

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [tables, setTables] = useState([
    {
      key: `table-${Date.now()}`,
      title: "Expenditure Capture",
      columns: [
        { name: "", key: "rowLabel" },
        { name: "Grants", key: "grants" },
        { name: "Loans", key: "loans" },
        { name: "Domestically Financed", key: "domesticallyFinanced" },
        { name: "Remarks", key: "remarks" },
      ],
      data: [
        {
          id: 1,
          rowLabel: "Current Expenditure",
          grants: "3",
          loans: "3",
          domesticallyFinanced: "2",
          remarks: "1",
        },
        {
          id: 2,
          rowLabel: "Investment Expenditure",
          grants: "3",
          loans: "1",
          domesticallyFinanced: "4",
          remarks: "nooo",
        },
        {
          id: 3,
          rowLabel: "Technical Assistance",
          grants: "3",
          loans: "2",
          domesticallyFinanced: "1",
          remarks: "yesss",
        },
        {
          id: 4,
          rowLabel: "Training",
          grants: "21",
          loans: "1",
          domesticallyFinanced: "33",
          remarks: "woww",
        },
      ],
    },
  ]);

  const handleAddRow = (tableKey, id) => {
    const newRow = {
      id: Date.now(),
      rowLabel: "",
      grants: "",
      loans: "",
      domesticallyFinanced: "",
      remarks: "",
    };

    const tableIndex = tables.findIndex((table) => table.key === tableKey);
    const rows = tables[tableIndex].data;
    const index = rows.findIndex((row) => row.id === id);
    const newTables = [...tables];
    newTables[tableIndex].data = [
      ...rows.slice(0, index + 1),
      newRow,
      ...rows.slice(index + 1),
    ];
    setTables(newTables);
  };

  const handleRemoveRow = (tableKey, id) => {
    const tableIndex = tables.findIndex((table) => table.key === tableKey);
    const rows = tables[tableIndex].data;
    const newTables = [...tables];
    newTables[tableIndex].data = rows.filter((row) => row.id !== id);
    setTables(newTables);
  };

  const handleInputChange = (tableKey, id, field, value) => {
    const tableIndex = tables.findIndex((table) => table.key === tableKey);
    const rows = tables[tableIndex].data;
    const newTables = [...tables];
    newTables[tableIndex].data = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setTables(newTables);
  };

  const handleSelectProject = (e) => {
    if (e.target.value === "") {
      return;
    }
    const newProjectId = parseInt(e.target.value, 10);
    setSelectedProject(newProjectId);
    dispatch(selectProject(newProjectId));
  };

  const handleSelectMonth = (e) => {
    setSelectedMonth(e.target.value);
    dispatch(selectMonth(e.target.value));
  };

  const handleNext = () => {

    // Check if a project has been selected
  if (selectedProject === 0) {
    alert('Please select a project before proceeding.');
    return;
  }
  
    const dataObject = tables;
    dispatch(setExpenditureTableData(dataObject));
    navigate("/disbursement-capture");
  };

  return (
    <div>
      <div className="flex justify-start">
        <select
          className="text-left border border-gray-400 rounded px-4 py-2 pl-2 pr-8 mr-4"
          value={selectedProject}
          onChange={handleSelectProject}
        >
          <option value="">Select a Project</option>
          {user.projects.map((project, index) => (
            <option key={index} value={project.id}>
              {project.nameEnglish}
            </option>
          ))}
        </select>
        <select
          className="text-left border border-gray-400 rounded px-4 py-2 pl-2 pr-8"
          value={selectedMonth}
          onChange={handleSelectMonth}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {tables.map((table) => (
        <Table
          editable={false}
          key={table.key}
          title={table.title}
          columns={table.columns}
          data={table.data}
          onAddRow={(id) => handleAddRow(table.key, id)}
          onRemoveRow={(id) => handleRemoveRow(table.key, id)}
          onInputChange={(id, field, value) =>
            handleInputChange(table.key, id, field, value)
          }
        />
      ))}
      <div className="flex justify-end mt-4">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ExpenditureCapture;
