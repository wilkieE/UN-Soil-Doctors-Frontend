import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import apiRequest from "../utils/api";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest("api/countrybudgets")
      .then((data) => {
        setBudgets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching budgets:", err.response?.status);
        setError(err.message);
        setLoading(false);
      });

    apiRequest("api/region/all")
      .then((data) => setRegions(data))
      .catch((error) =>
        console.log("Error fetching regions:", error.response?.status)
      );
  }, []);

  useEffect(() => {
    setSelectedCountry("");
  }, [selectedRegion]);

  const handleEdit = (certificateId) => {
    // TODO: implement edit certificate functionality
  };

  const handleDelete = (certificateId) => {
    // TODO: implement delete certificate functionality
  };

  const filteredBudgets = budgets.filter((budget) => {
    const regionCountries = selectedRegion
      ? regions.find((region) => region.RegionID.toString() === selectedRegion)
          ?.regionCountries || []
      : [];

    return (
      (!selectedCountry || budget.CountryID.toString() === selectedCountry) &&
      (!selectedRegion ||
        regionCountries.some(
          (country) => country.CountryID === budget.CountryID
        ))
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Country Budgets</h1>

      <div className="flex w-full justify-between mb-8">
        <div className="flex gap-4">
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.RegionID} value={region.RegionID}>
                {region.RegionName}
              </option>
            ))}
          </select>

          <div>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border rounded p-2"
              disabled={!selectedRegion}
            >
              <option value="">All Countries</option>
              {selectedRegion &&
                regions
                  .find(
                    (region) => region.RegionID.toString() === selectedRegion
                  )
                  ?.regionCountries.map((country) => (
                    <option key={country.CountryID} value={country.CountryID}>
                      {country.CountryName}
                    </option>
                  ))}
            </select>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Total Budget
              </th>
              <th scope="col" className="px-6 py-3">
                Budget Allocated
              </th>
              <th scope="col" className="px-6 py-3">
                Budget Spent
              </th>
              <th scope="col" className="px-6 py-3">
                Budget Year
              </th>
              <th scope="col" className="px-6 py-3">
                Comments
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBudgets.map((budget) => (
              <tr
                key={budget.BudgetID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{budget.country.CountryName}</td>
                <td className="px-6 py-4">{budget.TotalBudget}</td>
                <td className="px-6 py-4">{budget.BudgetAllocated}</td>
                <td className="px-6 py-4">{budget.BudgetSpent}</td>
                <td className="px-6 py-4">{budget.BudgetYear}</td>
                <td className="px-6 py-4">{budget.Comments}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-start items-center">
                    <button
                      className="bg-green-500 p-2 rounded text-white mr-2"
                      onClick={() => handleEdit(budget.BudgetID)}
                    >
                      <EditIcon className="w-6 h-6" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white"
                      onClick={() => handleDelete(budget.BudgetID)}
                    >
                      <ClearIcon className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budgets;
