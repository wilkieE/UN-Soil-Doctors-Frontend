import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import apiRequest from "../utils/api";
import AddPromoter from "./AddPromoter";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    apiRequest("api/participants")
      .then((data) => {
        setParticipants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error.response.status);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    apiRequest("api/region/all")
      .then((data) => setRegions(data))
      .catch((error) =>
        console.log("Error fetching regions:", error.response.status)
      );
  }, []);

  useEffect(() => {
    setSelectedCountry("");
  }, [selectedRegion]);

  if (loading) return "Loading...";
  if (error) return `Error: ${error}`;

  const handleEdit = (participantId) => {
    //TODO implement edit participant functionality
  };

  const handleDelete = (participantId) => {
    //TODO implement delete participant functionality
  };

  const isCountryInSelectedRegion = (countryId) => {
    const region = regions.find(
      (region) => region.RegionID.toString() === selectedRegion
    );
    return (
      region &&
      region.regionCountries.some((country) => country.CountryID === countryId)
    );
  };

  const filteredParticipants = participants.filter((participant) => {
    if (
      selectedCountry &&
      participant.ParticipantCountry.CountryID.toString() !== selectedCountry
    )
      return false;
    if (
      selectedRegion &&
      !isCountryInSelectedRegion(participant.ParticipantCountry.CountryID)
    )
      return false;
    if (selectedRole && participant.Role.RoleID.toString() !== selectedRole)
      return false;

    return true;
  });

  const roleIDs = [
    ...new Set(participants.map((participant) => participant.RoleID)),
  ];
  const uniqueRoles = roleIDs.map(
    (id) => participants.find((p) => p.RoleID === id).Role
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Participants</h1>
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role.RoleID} value={role.RoleID}>
                {role.RoleDescription}
              </option>
            ))}
          </select>

          <select
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
      <div className="relative overflow-x-auto mt-8 w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Male Total
              </th>
              <th scope="col" className="px-6 py-3">
                Female Total
              </th>
              <th scope="col" className="px-6 py-3">
                Participation Date
              </th>
              <th scope="col" className="px-6 py-3">
                Certified
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.map((participant) => (
              <tr
                key={participant.ParticipantID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  {participant.Role.RoleDescription}
                </td>
                <td className="px-6 py-4">
                  {participant.ParticipantCountry.CountryName}
                </td>
                <td className="px-6 py-4">{participant.MaleTotal}</td>
                <td className="px-6 py-4">{participant.FemaleTotal}</td>
                <td className="px-6 py-4">
                  {new Date(participant.ParticipationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {participant.Certified ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-start items-center">
                    <button
                      className="bg-green-500 p-2 rounded text-white mr-2"
                      onClick={() => handleEdit(participant.ParticipantID)}
                    >
                      <EditIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white"
                      onClick={() => handleDelete(participant.ParticipantID)}
                    >
                      <ClearIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3" />
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

export default Participants;
