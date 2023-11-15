import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import apiRequest from "../utils/api";
import AddPromoter from "./AddPromoter";

const Kits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    apiRequest("api/kits")
      .then((data) => {
        setKits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching kits:", err.response?.status);
        setError(err.message);
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

  const handleEdit = (kitId) => {
    //TODO: implement edit kit functionality
  };

  const handleDelete = (kitId) => {
    //TODO: implement delete kit functionality
  };

  if (loading) return "Loading...";
  if (error) return `Error: ${error}`;

  const filteredKits = kits.filter((kit) => {
    if (selectedRegion && kit.country.RegionID.toString() !== selectedRegion) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Kits</h1>

      <div className="flex w-full justify-between mb-8">
        <div className="flex gap-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.RegionID} value={region.RegionID}>
                {region.RegionName}
              </option>
            ))}
          </select>
        </div>
        {/* Generic  add button goes here */}
      </div>

      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Kits Shipped
              </th>
              <th scope="col" className="px-6 py-3">
                Kits Planned For Shipping
              </th>
              <th scope="col" className="px-6 py-3">
                Shipment Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKits.map((kit) => (
              <tr
                key={kit.KitID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{kit.country.CountryName}</td>
                <td className="px-6 py-4">{kit.KitsShipped}</td>
                <td className="px-6 py-4">{kit.KitsPlannedForShipping}</td>
                <td className="px-6 py-4">
                  {new Date(kit.ShipmentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-start items-center">
                    <button
                      className="bg-green-500 p-2 rounded text-white mr-2"
                      onClick={() => handleEdit(kit.KitID)}
                    >
                      <EditIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white"
                      onClick={() => handleDelete(kit.KitID)}
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

export default Kits;
