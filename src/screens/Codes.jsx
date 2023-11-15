import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchCodes } from "../redux/slices/codesSlice.js";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import AddCode from "./AddCode.jsx";

const Codes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const codes = useSelector((state) => state.codes.entities);
  const loadingStatus = useSelector((state) => state.codes.loading);
  const [codeType, setCodeType] = useState("donors");

  const handleCodeTypeChange = (e) => {
    const selectedCodeType = e.target.value;
    setCodeType(selectedCodeType);
  };

  useEffect(() => {
    dispatch(fetchCodes(codeType));
  }, [dispatch, codeType]);

  if (loadingStatus === "loading") return <div>{t("loading")}</div>;
  if (loadingStatus === "error") return <div>{t("error")}</div>;

  const handleEdit = (codeId) => {
    // handle edit functionality here
  };

  const handleDelete = (codeId) => {
    // handle delete functionality here
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">{t("codes")}</h1>
      <div className="flex w-full justify-between">
        <select value={codeType} onChange={handleCodeTypeChange}>
          <option value="donors">Donor Codes</option>
          <option value="financialCodes">Financial Codes</option>
        </select>
        <AddCode codeType={codeType} />
      </div>
      <div className="w-full mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("code")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("description")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("fundedProjects")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr
                key={codeType === "donors" ? code.donorId : code.codeId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {code.code}
                </th>
                <td className="px-6 py-4">
                  {codeType === "donors"
                    ? code.description
                    : code.descriptionEn}
                </td>
                <td className="px-6 py-4">
                  {codeType === "donors" && code.fundedProjectIds
                    ? code.fundedProjectIds.join(", ")
                    : ""}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-500 p-2 rounded text-white mr-2"
                    onClick={() =>
                      handleEdit(
                        codeType === "donors" ? code.donorId : code.codeId
                      )
                    }
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded text-white"
                    onClick={() =>
                      handleDelete(
                        codeType === "donors" ? code.donorId : code.codeId
                      )
                    }
                  >
                    <ClearIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Codes;
