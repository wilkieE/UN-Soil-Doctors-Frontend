import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendReportData } from "../redux/slices/reportSlice";
import Table from "../components/Common/Table"; // Import the Table component
import { use } from "i18next";

const SubmitReportScreen = () => {
  const dispatch = useDispatch();
  const disbursementTableData = useSelector(
    (state) => state.disbursementTableData.data
  );
  const expenditureTableData = useSelector(
    (state) => state.expenditureTableData.data
  );
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  const selectedMonth = useSelector((state) => state.projects.selectedMonth);

  const sendData = async () => {
    const combinedData = [...expenditureTableData, ...disbursementTableData];

    const formattedData = combinedData.map((item) => {
      return {
        title: item.title,
        data: item.data.map((entry) => {
          let formattedEntry = { ...entry };
          delete formattedEntry.id; // Removes the id property from each entry
          return formattedEntry;
        }),
      };
    });
    const today = new Date().toISOString().split("T")[0];

    const finalData = {
      projectId: selectedProject,
      reportingMonth: selectedMonth + 1, //date object months are 0 indexed
      submissionDate: `${today}`,
      status: "submitted", //
      reasonForReturn: null, // TODO: expand reasonForReturn functionality
      reportData: formattedData,
    };

    try {
      const response = await dispatch(sendReportData(finalData));
      
      // Check the response or payload to determine success
      if (response && response.payload && response.payload.success) {
        window.alert("Report submitted successfully!");
    } else {
        window.alert("Error submitting report.");
    }
    
  } catch (error) {
      setAlert({
          show: true,
          type: "error",
          message: error.message || "An error occurred.",
      });
  }
  };

  // Creates columns data for Expenditure Data and Disbursement Data
  const createColumns = (data, title) => {
    const keys = Object.keys(data[0]);
    return keys
      .filter(
        (key) =>
          key !== "id" &&
          !(key === "remarks" && title === "Expenditure Capture")
      ) // exclude the 'id' key and 'remarks' key from Expenditure Capture table
      .map((key) => {
        return { name: key, key: key };
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Report Data</h1>
      {expenditureTableData.map((table, index) => (
        <Table
          key={index}
          columns={createColumns(table.data, table.title)}
          data={table.data}
          editable={false}
        />
      ))}
      {disbursementTableData.map((table, index) => (
        <Table
          key={index}
          columns={createColumns(table.data, table.title)}
          data={table.data}
          editable={false}
        />
      ))}
      <div className="flex justify-end mt-4">
        <button onClick={sendData}>Submit Report</button>
      </div>
    </div>
  );
};

export default SubmitReportScreen;
