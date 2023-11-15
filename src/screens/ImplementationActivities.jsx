import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  fetchImplementationActivities,
  addImplementationActivity,
} from "../redux/slices/ImplementationActivitiesSlice";
import apiRequest from "../utils/api";
import AddPromoter from "./AddPromoter";

const ImplementationActivities = () => {
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [regions, setRegions] = useState([]);

  const availableStatuses = Array.from(
    new Set(activities.map((activity) => activity.status.StatusDescription))
  );

  useEffect(() => {
    setLoading(true);
    apiRequest("api/implementation-activities")
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching implementation activities:",
          err.response?.status
        );
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    apiRequest("api/region/all")
      .then((data) => setRegions(data))
      .catch((err) => {
        console.log("Error fetching regions:", err.response?.status);
        setError(err.message);
      });
  }, []);

  const handleAddActivity = () => {
    if (description) {
      dispatch(addImplementationActivity({ Description: description }));
      setDescription("");
    }
  };

  const handleEdit = (activityId) => {
    //TODO implement edit activity functionality
  };

  const handleDelete = (activityId) => {
    //TODO implement delete activity functionality
  };

  const filteredActivities = activities.filter((activity) => {
    const regionCountries = selectedRegion
      ? regions.find((region) => region.RegionID.toString() === selectedRegion)
          ?.regionCountries || []
      : [];

    return (
      (!selectedCountry ||
        activity.country.CountryID.toString() === selectedCountry) &&
      (!selectedRegion ||
        regionCountries.some(
          (country) => country.CountryID === activity.country.CountryID
        )) &&
      (!selectedStatus || activity.status.StatusDescription === selectedStatus)
    );
  });

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Implementation Activities</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="flex w-full justify-between mb-8">
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Statuses</option>
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>{" "}
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCountry("");
            }}
            className="border rounded p-2"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.RegionID} value={region.RegionID}>
                {region.RegionName}
              </option>
            ))}
          </select>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border rounded p-2"
            disabled={!selectedRegion}
          >
            <option value="">All Countries</option>
            {selectedRegion &&
              regions
                .find((region) => region.RegionID.toString() === selectedRegion)
                ?.regionCountries.map((country) => (
                  <option key={country.CountryID} value={country.CountryID}>
                    {country.CountryName}
                  </option>
                ))}
          </select>
        </div>
        <AddPromoter />
      </div>

      {loading === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Activity Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actors
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr
                  key={activity.ActivityID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{activity.Description}</td>
                  <td className="px-6 py-4">{activity.country.CountryName}</td>
                  <td className="px-6 py-4">
                    {activity.status.StatusDescription}
                  </td>
                  <td className="px-6 py-4">
                    {activity.promoter
                      .map((promoter) => promoter.OrganizationName)
                      .join(", ")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start items-center">
                      <button
                        className="bg-green-500 p-2 rounded text-white mr-2"
                        onClick={() => handleEdit(activity.ActivityID)}
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        className="bg-red-500 p-2 rounded text-white"
                        onClick={() => handleDelete(activity.ActivityID)}
                      >
                        <ClearIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImplementationActivities;
