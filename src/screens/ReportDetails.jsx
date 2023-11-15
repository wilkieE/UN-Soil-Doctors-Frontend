import React from "react";
import { useLocation } from "react-router-dom";
import Table from "../components/Common/Table";

const ReportDetails = () => {
  const location = useLocation();
  const report = location.state.report;


  const createExpenditureTableData = () => {
    const currentExpenditure = report.currentExpenditures[0];
    const investmentExpenditure = report.investmentExpenditures[0];
    const technicalAssistance = report.technicalAssistanceExpenditures[0];
    const training = report.trainingExpenditures[0];

    return [
      {
        rowLabels: "Current Expenditure",
        grants: currentExpenditure.externallyFinancedGrants,
        loans: currentExpenditure.externallyFinancedLoans,
        domesticallyFinanced: currentExpenditure.domesticallyFinanced,
        id: 1,
      },
      {
        rowLabels: "Investment Expenditure",
        grants: investmentExpenditure.externallyFinancedGrants,
        loans: investmentExpenditure.externallyFinancedLoans,
        domesticallyFinanced: investmentExpenditure.domesticallyFinanced,

        id: 2,
      },
      {
        rowLabels: "Technical Assistance",
        grants: technicalAssistance.grants,
        loans: technicalAssistance.loans,
        domesticallyFinanced: technicalAssistance.domesticallyFinanced,
        id: 3,
      },
      {
        rowLabels: "Training",
        grants: training.grants,
        loans: training.loans,
        domesticallyFinanced: training.domesticallyFinanced,
        id: 4,
      },
    ];
  };

  const externalDisbursements = report.disbursements.filter(
    (disbursement) => disbursement.type === "external"
  );
  const domesticDisbursements = report.disbursements.filter(
    (disbursement) => disbursement.type === "domestic"
  );

  const createDisbursementTableData = () => {
    return externalDisbursements.map((disbursement, index) => {
      return {
        donorCode: disbursement.donorId,
        grants: disbursement.externallyFinancedGrants,
        loans: disbursement.externallyFinancedLoans,
        id: index + 1,
      };
    });
  };

  const createDomesticDisbursementTableData = () => {
    return domesticDisbursements.map((disbursement, index) => {
      return {
        financialCode: disbursement.donorId,
        amount: disbursement.domesticallyFinanced,
        id: index + 1,
      };
    });
  };

  const expenditureColumns = [
    { name: "Row Labels", key: "rowLabels" },
    { name: "Grants", key: "grants" },
    { name: "Loans", key: "loans" },
    { name: "Domestically Financed", key: "domesticallyFinanced" },
  ];

  const disbursementColumns = [
    { name: "Donor Code", key: "donorCode" },
    { name: "Grants", key: "grants" },
    { name: "Loans", key: "loans" },
  ];

  const domesticDisbursementColumns = [
    { name: "Financial Code", key: "financialCode" },
    { name: "Amount", key: "amount" },
  ];

  return (
    <div>
      <p className="text-xl">{report.projectName} Report</p>
      <h2>Expenditure</h2>
      <Table
        columns={expenditureColumns}
        data={createExpenditureTableData()}
        editable={false}
      />
      <h2>A. Externally Financed</h2>
      <Table
        columns={disbursementColumns}
        data={createDisbursementTableData()}
        editable={false}
      />
      <h2>B. Domestically Financed</h2>
      <Table
        columns={domesticDisbursementColumns}
        data={createDomesticDisbursementTableData()}
        editable={false}
      />
    </div>
  );
};

export default ReportDetails;
