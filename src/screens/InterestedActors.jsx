import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import apiRequest from "../utils/api";

const InterestedActors = () => {
  const [interestedActors, setInterestedActors] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    apiRequest("api/interested-actors")
      .then((data) => setInterestedActors(data))
      .catch((error) =>
        console.log("Error fetching interested actors:", error.response.status)
      );
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

  const handleEdit = (actorId) => {
    // TODO: implement edit functionality for interested actors
  };

  const handleDelete = (actorId) => {
    // TODO: implement delete functionality for interested actors
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

  const filteredActors = interestedActors.filter((actor) => {
    const regionCountries = selectedRegion
      ? regions.find((region) => region.RegionID.toString() === selectedRegion)
          ?.regionCountries || []
      : [];

    return (
      (!selectedCountry || actor.CountryID.toString() === selectedCountry) &&
      (!selectedRegion ||
        regionCountries.some(
          (country) => country.CountryID === actor.CountryID
        )) &&
      (!selectedGender || actor.Gender === selectedGender)
    );
  });

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Interested Actors</h1>
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
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

        <div className="px-4 py-2 mt-6"> </div>
      </div>
      <div className="relative overflow-x-auto mt-8 w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="px-6 py-3">
                Organization Name
              </th> */}
              <th scope="col" className="px-6 py-3">
                Promoter Email
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredActors.map((actor) => (
              <tr
                key={actor.PromoterID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                {/* <td className="px-6 py-4">{actor.orgName}</td> */}
                <td className="px-6 py-4">{actor.email}</td>
                <td className="px-6 py-4">{actor.Gender}</td>
                <td className="px-6 py-4">
                  {getCountryNameById(actor.CountryID)}
                </td>
                <td className="px-6 py-4">{actor.email}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-start items-center">
                    <button
                      className="bg-green-500 p-2 rounded text-white mr-2"
                      onClick={() => handleEdit(actor.PromoterID)}
                    >
                      <EditIcon className="w-6 h-6" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white"
                      onClick={() => handleDelete(actor.PromoterID)}
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

export default InterestedActors;
