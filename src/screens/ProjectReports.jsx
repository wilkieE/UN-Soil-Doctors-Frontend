import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchProjectReports } from "../redux/slices/projectReportsSlice.js";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import i18next from "i18next";

const ProjectReports = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const projectReports = useSelector((state) => state.projectReports.entities);
  const loadingStatus = useSelector((state) => state.projectReports.loading);

  const [filterMonth, setFilterMonth] = useState("all");

  useEffect(() => {
    dispatch(fetchProjectReports());
    console.log(projectReports);
  }, [dispatch]);

  if (loadingStatus === "loading") return <div>{t("loading")}</div>;
  if (loadingStatus === "error") return <div>{t("error")}</div>;

  const handleViewReport = (report) => {
    console.log(report);
    navigate("/report-details", { state: { report } });
  };

  const filteredReports = projectReports.reduce((acc, project) => {
    const matchedReports = project.reports
      .filter((report) =>
        filterMonth === "all"
          ? true
          : report.reportingMonth === parseInt(filterMonth, 10)
      )
      .map((report) => ({
        ...report,
        projectName: project.nameEnglish,
        nodalImplementingMinistry: project.nodalImplementingMinistry,
      }));

    return [...acc, ...matchedReports];
  }, []);

  const getTranslatedMonth = (monthValue) => {
    switch (monthValue) {
      case "1":
        return t("January");
      case "2":
        return t("February");
      case "3":
        return t("March");
      case "4":
        return t("April");
      case "5":
        return t("May");
      case "6":
        return t("June");
      case "7":
        return t("July");
      case "8":
        return t("August");
      case "9":
        return t("September");
      case "10":
        return t("October");
      case "11":
        return t("November");
      case "12":
        return t("December");
      default:
        return t("all");
    }
  };

  const handleGenerateExcel = () => {
    generateCSV(filteredReports);
  };

  const transformDataForCSV = (reports) => {
    console.log(reports);
    const transformedReports = reports.map((report) => {
      console.log(report);
      let currentExpendituresTotal = 0;
      let investmentExpendituresTotal = 0;
      let technicalAssistanceExpendituresTotal = 0;
      let trainingExpendituresTotal = 0;

      let externallyFinancedGrantsTotal = 0;
      let externallyFinancedLoansTotal = 0;
      let domesticallyFinancedTotal = 0;

      (report.currentExpenditures || []).forEach((item) => {
        currentExpendituresTotal +=
          Number(item.domesticallyFinanced) +
          Number(item.externallyFinancedGrants) +
          Number(item.externallyFinancedLoans);
      });

      (report.investmentExpenditures || []).forEach((item) => {
        investmentExpendituresTotal +=
          Number(item.domesticallyFinanced) +
          Number(item.externallyFinancedGrants) +
          Number(item.externallyFinancedLoans);
      });

      (report.technicalAssistanceExpenditures || []).forEach((item) => {
        technicalAssistanceExpendituresTotal +=
          Number(item.domesticallyFinanced) +
          Number(item.grants) +
          Number(item.loans);
      });

      (report.trainingExpenditures || []).forEach((item) => {
        trainingExpendituresTotal +=
          Number(item.domesticallyFinanced) +
          Number(item.grants) +
          Number(item.loans);
      });

      const expenditureTotal =
        currentExpendituresTotal +
        investmentExpendituresTotal +
        technicalAssistanceExpendituresTotal +
        trainingExpendituresTotal;

      (report.disbursements || []).forEach((item) => {
        externallyFinancedGrantsTotal += Number(item.externallyFinancedGrants);
        externallyFinancedLoansTotal += Number(item.externallyFinancedLoans);
        domesticallyFinancedTotal += Number(item.domesticallyFinanced);
      });

      return {
        projectId: report.projectId,
        projectName: report.projectName,
        currentExpendituresTotal,
        investmentExpendituresTotal,
        technicalAssistanceExpendituresTotal,
        trainingExpendituresTotal,
        expenditureTotal,
        externallyFinancedGrantsTotal,
        externallyFinancedLoansTotal,
        domesticallyFinancedTotal,
      };
    });
    return combineReportsByProjectId(transformedReports);
  };

  const combineReportsByProjectId = (reports) => {
    return reports.reduce((accumulator, currentReport) => {
      const found = accumulator.find(
        (item) => item.projectId === currentReport.projectId
      );

      if (found) {
        found.currentExpendituresTotal +=
          currentReport.currentExpendituresTotal;
        found.investmentExpendituresTotal +=
          currentReport.investmentExpendituresTotal;
        found.technicalAssistanceExpendituresTotal +=
          currentReport.technicalAssistanceExpendituresTotal;
        found.trainingExpendituresTotal +=
          currentReport.trainingExpendituresTotal;
        found.expenditureTotal += currentReport.expenditureTotal;
        found.externallyFinancedGrantsTotal +=
          currentReport.externallyFinancedGrantsTotal;
        found.externallyFinancedLoansTotal +=
          currentReport.externallyFinancedLoansTotal;
        found.domesticallyFinancedTotal +=
          currentReport.domesticallyFinancedTotal;
      } else {
        accumulator.push(currentReport);
      }

      return accumulator;
    }, []);
  };

  const generateCSV = (data) => {
    const transformedData = transformDataForCSV(data);

    const currentLanguage = i18next.language;

    // Temporarily switch to Portuguese
    i18next.changeLanguage("pt");

    // Fetch the translations for Portuguese
    const header = [
      i18next.t("projectId"),
      i18next.t("projectName"),
      i18next.t("currentExpendituresTotal"),
      i18next.t("investmentExpendituresTotal"),
      i18next.t("technicalAssistanceExpendituresTotal"),
      i18next.t("trainingExpendituresTotal"),
      i18next.t("total"),
      i18next.t("externallyFinancedGrantsTotal"),
      i18next.t("externallyFinancedLoansTotal"),
      i18next.t("domesticallyFinancedTotal"),
    ];

    // Switch back to the original language
    i18next.changeLanguage(currentLanguage);

    const monthLabel =
      filterMonth === "all" ? t("all") : getTranslatedMonth(filterMonth);

    const csvData = [
      [, , , , monthLabel], // Title padded with commas to make it "centered"
      [],
      header,
      ...transformedData.map((report) => [
        report.projectId,
        report.projectName,
        report.currentExpendituresTotal,
        report.investmentExpendituresTotal,
        report.technicalAssistanceExpendituresTotal,
        report.trainingExpendituresTotal,
        report.expenditureTotal,
        report.externallyFinancedGrantsTotal,
        report.externallyFinancedLoansTotal,
        report.domesticallyFinancedTotal,
      ]),
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "project_reports.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full flex flex-col ">
      <h1 className="text-2xl font-semibold mb-4">{t("projectReports")}</h1>
      <div className="flex w-full justify-between">
        <select
          className="text-left border border-gray-400 rounded px-4 py-2 pl-2 pr-8"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="all">{t("all")}</option>
          <option value="1">{t("January")}</option>
          <option value="2">{t("February")}</option>
          <option value="3">{t("March")}</option>
          <option value="4">{t("April")}</option>
          <option value="5">{t("May")}</option>
          <option value="6">{t("June")}</option>
          <option value="7">{t("July")}</option>
          <option value="8">{t("August")}</option>
          <option value="9">{t("September")}</option>
          <option value="10">{t("October")}</option>
          <option value="11">{t("November")}</option>
          <option value="12">{t("December")}</option>
        </select>
        <button
          className="border border-gray-400 rounded px-4 py-2 flex items-center"
          onClick={handleGenerateExcel}
        >
          <GetAppIcon className="mr-2" />
          {t("generateExcel")}
        </button>
      </div>
      <div className="relative overflow-x-auto mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("projectName")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("implementingMinistry")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("dateOfAddition")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr
                key={report.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {report.projectName}
                </td>
                <td className="px-6 py-4">
                  {report.nodalImplementingMinistry}
                </td>
                <td className="px-6 py-4">
                  {new Date(report.submissionDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 p-2 rounded text-white"
                    onClick={() => handleViewReport(report)}
                  >
                    {t("viewReport")}
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

export default ProjectReports;
