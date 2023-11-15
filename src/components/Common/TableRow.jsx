import React from "react";

const TableRow = ({
  row,
  columns,
  onAddRow,
  onRemoveRow,
  onInputChange,
  editable,
}) => {
  const handleChange = (field, value) => {
    onInputChange(row.id, field, value);
  };

  return (
    <tr className="bg-white  dark:bg-gray-800 ">
      {columns.map((column, index) => (
        <th
          scope="row"
          className={`px-6 py-4 font-medium border-b dark:border-gray-700 text-gray-900 whitespace-nowrap dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 text-center ${
            index === 0 && !editable
              ? "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              : ""
          }`}
          key={column.key}
        >
          <input
            type="text"
            defaultValue={row[column.key]}
            className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            onChange={(event) => handleChange(column.key, event.target.value)}
            readOnly={!editable}
          />
        </th>
      ))}
      {editable && (
        <td
          className="px-6 py-4 bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 text-center"
          style={{ backgroundColor: "#242424" }}
        >
          <div className="flex space-x-1">
            <button
              onClick={() => onAddRow(row.id)}
              className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Add row button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
            <button
              onClick={() => onRemoveRow(row.id)}
              className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Remove row button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
