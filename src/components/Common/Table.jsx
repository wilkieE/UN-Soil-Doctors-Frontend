import React from "react";
import TableRow from "./TableRow";

const Table = ({
  title,
  columns,
  data,
  onAddRow,
  onRemoveRow,
  onInputChange,
  editable,
}) => {
  const totalCalculation = (key) =>
    data.reduce((sum, row) => sum + Number(row[key] || 0), 0);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white py-3 text-center">
        {title}
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-center">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              row={row}
              columns={columns}
              onAddRow={onAddRow}
              onRemoveRow={onRemoveRow}
              onInputChange={onInputChange}
              editable={editable}
            />
          ))}
          <tr>
            {columns.map((column, index) => (
              <td
                key={index}
                className="px-6 py-4 font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 text-center"
              >
                {index === 0 ? "Total" : totalCalculation(column.key)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
