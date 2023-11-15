import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddPromoter from "./AddPromoter";
import { Link } from "react-router-dom";
import apiRequest from "../utils/api";

const Actors = () => {
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedActorType, setSelectedActorType] = useState("");
  const [regions, setRegions] = useState([]);
  const [actorTypes, setActorTypes] = useState([]);
  const [confirmationFilter, setConfirmationFilter] = useState("all");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    setLoading(true);
    apiRequest("api/promoters")
      .then((data) => {
        setPromoters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching promoters:", error.response.status);
        setError(error);
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
    apiRequest("api/actortypes")
      .then((data) => setActorTypes(data))
      .catch((error) =>
        console.log("Error fetching actor types:", error.response.status)
      );
  }, []);

  useEffect(() => {
    console.log(actorTypes);
  }, [actorTypes]);

  useEffect(() => {
    console.log(promoters);
  }, [promoters]);

  if (loading === "loading") return "Loading...";
  if (error) return `Error: ${error}`;

  const handleEdit = (promoterId) => {
    //TODO implement edit promoter functionality
  };

  const handleDelete = (promoterId) => {
    //TODO implement delete promoter functionality
  };

  const getCountryNameById = (countryId) => {
    for (let region of regions) {
      for (let country of region.regionCountries) {
        if (country.CountryID === countryId) {
          return country.CountryName;
        }
      }
    }
    return "";
  };

  const filteredPromoters = promoters.filter((promoter) => {
    if (selectedCountry && promoter.CountryID.toString() !== selectedCountry)
      return false;
    if (
      selectedRegion &&
      !regions
        .find((region) => region.RegionID.toString() === selectedRegion)
        .regionCountries.some(
          (country) => country.CountryID === promoter.CountryID
        )
    )
      return false;
    if (
      selectedActorType &&
      promoter.ActorTypeID.toString() !== selectedActorType
    )
      return false;
    if (confirmationFilter === "confirmed" && !promoter.isConfirmed)
      return false;
    if (confirmationFilter === "unconfirmed" && promoter.isConfirmed)
      return false;
    if (selectedGender && promoter.Gender !== selectedGender) return false;

    return true;
  });

  const validCountryIDs = [
    ...new Set(promoters.map((promoter) => promoter.CountryID)),
  ];
  const validRegions = regions.filter((region) =>
    region.regionCountries.some((country) =>
      validCountryIDs.includes(country.CountryID)
    )
  );
  validRegions.forEach((region) => {
    region.regionCountries = region.regionCountries.filter((country) =>
      validCountryIDs.includes(country.CountryID)
    );
  });

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message || "An error occurred"}`;

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Actors</h1>
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <select
            value={selectedActorType}
            onChange={(e) => setSelectedActorType(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Actor Types</option>
            {actorTypes.map((actorType) => (
              <option key={actorType.ActorTypeID} value={actorType.ActorTypeID}>
                {actorType.TypeDescription}
              </option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={confirmationFilter}
            onChange={(e) => setConfirmationFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">Confirmation Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="unconfirmed">Unconfirmed</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCountry("");
            }}
            className="border rounded p-2"
          >
            <option value="">All Regions</option>
            {validRegions.map((region) => (
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
                Actor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Remaining Budget
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPromoters.map((promoter) => (
              <tr
                key={promoter.PromoterID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <Link to={`/promoters/${promoter.PromoterID}`}>
                    {promoter.OrganizationName}
                  </Link>
                </td>
                <td className="px-6 py-4">{promoter.Gender}</td>
                <td className="px-6 py-4">
                  {getCountryNameById(promoter.CountryID)}
                </td>
                <td className="px-6 py-4">
                  {promoter.isConfirmed ? "Comfirmed" : "Unconfirmed"}
                </td>
                <td className="px-6 py-4">
                  {promoter.promoterBudgets.RemainingBudget}
                </td>
                <td className="px-6 py-4">{promoter.Email}</td>
                <td className="px-6 py-4">{promoter.PhoneNo}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-start items-center">
                    <button
                      className="bg-green-500 p-2 rounded text-white mr-2"
                      onClick={() => handleEdit(promoter.PromoterID)}
                    >
                      <EditIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white"
                      onClick={() => handleDelete(promoter.PromoterID)}
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

export default Actors;
