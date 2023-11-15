import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PromoterDetails = () => {
  const { promoterId } = useParams();
  const [promoter, setPromoter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/promoters/${promoterId}`)
      .then((response) => response.json())
      .then((data) => {
        setPromoter(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [promoterId]);

  const handleInputChange = (event, field) => {
    setPromoter({ ...promoter, [field]: event.target.value });
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  if (loading)
    return <div className="text-center mt-5 text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5 text-xl text-red-500">
        Error: {error}
      </div>
    );
  if (!promoter)
    return <div className="text-center mt-5 text-xl">Promoter not found</div>;

  const fields = [
    ["OrganizationName", "Organization Name"],
    ["DateOfRegistration", "Date Of Registration", "date"],
    ["PromoterStatus", "Status"],
    ["Email", "Email"],
    ["ContactPersonName", "Contact Person"],
    ["ContactPersonPosition", "Contact Person Position"],
    ["Municipality", "Municipality"],
    ["OrganizationType", "Organization Type"],
    ["ExistingProgramStatus", "Existing Program Status", "checkbox"],
    ["TrainingInterest", "Training Interest"],
    ["ImplementationScale", "Implementation Scale"],
    ["InvolvementCapability", "Involvement Capability"],
    ["TargetedFarmerCommunitySize", "Targeted Farmer Community Size"],
    [
      "DevelopedEducationalMaterialStatus",
      "Developed Educational Material Status",
      "checkbox",
    ],
    ["AccessToFunds", "Access To Funds", "checkbox"],
    ["AgreedToTOR", "Agreed To TOR", "checkbox"],
    ["Feedback", "Feedback"],
    ["PreferredContactMeans", "Preferred Contact Means"],
    ["ReplyDate", "Reply Date", "date"],
    ["ReplyContent", "Reply Content"],
    ["ActorType", "Actor Type"],
    ["MapInstitutionName", "Map Institution Name"],
    ["RegisteredInMap", "Registered In Map", "checkbox"],
    ["Comments", "Comments"],
  ];

  return (
    <div className="promoter-details bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4 font-semibold text-center text-gray-900 dark:text-white">
          {editing ? (
            <input
              type="text"
              value={promoter.OrganizationName}
              onChange={(e) => handleInputChange(e, "OrganizationName")}
            />
          ) : (
            promoter.OrganizationName
          )}
        </h1>
        <button
          onClick={toggleEdit}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(([field, label, type = "text"]) => (
          <div
            key={field}
            className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
          >
            <strong className="block text-gray-600 dark:text-gray-300">
              {label}:
            </strong>
            {editing ? (
              <input
                type={type}
                value={promoter[field] || ""}
                onChange={(e) => handleInputChange(e, field)}
              />
            ) : (
              <span className="text-gray-800 dark:text-gray-400">
                {promoter[field]}
              </span>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-6 flex justify-end">
          <button className="bg-green-500 text-white rounded px-4 py-2">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoterDetails;
