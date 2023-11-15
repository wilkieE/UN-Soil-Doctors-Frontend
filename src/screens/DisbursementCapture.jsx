import React, { useState } from "react";
import Table from "../components/Common/Table";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDisbursementTableData } from "../redux/slices/disbursementTableDataSlice";

const DisbursementCapture = () => {
  const [tables, setTables] = useState([
    {
      key: `table-${Date.now()}`,
      title: "A. Externally Financed",
      columns: [
        { name: "Donor Code", key: "donorCode" },
        { name: "Grants", key: "grants" },
        { name: "Loans", key: "loans" },
      ],
      data: [
        {
          id: 1,
          donorCode: "A1",
          grants: "300",
          loans: "500",
        },
        {
          id: 2,
          donorCode: "B2",
          grants: "700",
          loans: "47",
        },
      ],
    },
    {
      key: `table-${Date.now() + 1}`,
      title: "B. Domestically Financed",
      columns: [
        { name: "Financial Code", key: "financialCode" },
        { name: "Amount", key: "amount" },
      ],
      data: [
        {
          id: 1,
          financialCode: "C3",
          amount: "1000",
        },
        {
          id: 2,
          financialCode: "D4",
          amount: "2000",
        },
      ],
    },
  ]);
  const handleAddRow = (tableKey, id) => {
    const newRow = {
      id: Date.now(),
      donorCode: "",
      grants: "",
      loans: "",
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    const dataObject = tables;
    dispatch(setDisbursementTableData(dataObject));
    navigate("/submit-report");
  };
  return (
    <div>
      {tables.map((table) => (
        <Table
          editable={true}
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

export default DisbursementCapture;
