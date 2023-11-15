import React, { useEffect } from "react";
import FormField from "./FormField";

const PromoterForm = ({
  promoter,
  handleInputChange,
  handleSubmit,
  formType,
  codeType,
}) => {
  const isEditForm = formType === "Edit";

  const fieldData = [
    { label: "Date of Registration", type: "date", name: "DateOfRegistration" },
    { label: "Actor Status", type: "text", name: "PromoterStatus" },
    { label: "Email", type: "email", name: "Email" },
    { label: "Contact Person Name", type: "text", name: "ContactPersonName" },
    {
      label: "Contact Person Position",
      type: "text",
      name: "ContactPersonPosition",
    },
    { label: "Actor Type ID", type: "number", name: "ActorTypeID" },
    { label: "Country ID", type: "number", name: "CountryID" },
    { label: "Municipality", type: "text", name: "Municipality" },
    { label: "Organization Name", type: "text", name: "OrganizationName" },
    { label: "Organization Type", type: "text", name: "OrganizationType" },
    {
      label: "Existing Program Status",
      type: "checkbox",
      name: "ExistingProgramStatus",
    },
    { label: "Training Interest", type: "text", name: "TrainingInterest" },
    {
      label: "Implementation Scale",
      type: "text",
      name: "ImplementationScale",
    },
    {
      label: "Involvement Capability",
      type: "text",
      name: "InvolvementCapability",
    },
    {
      label: "Targeted Farmer Community Size",
      type: "number",
      name: "TargetedFarmerCommunitySize",
    },
    {
      label: "Developed Educational Material Status",
      type: "checkbox",
      name: "DevelopedEducationalMaterialStatus",
    },
    { label: "Access To Funds", type: "checkbox", name: "AccessToFunds" },
    { label: "Agreed To TOR", type: "checkbox", name: "AgreedToTOR" },
    { label: "Feedback", type: "text", name: "Feedback" },
    {
      label: "Preferred Contact Means",
      type: "text",
      name: "PreferredContactMeans",
    },
    { label: "Reply Date", type: "date", name: "ReplyDate" },
    { label: "Reply Content", type: "text", name: "ReplyContent" },
    { label: "Actor Type", type: "text", name: "ActorType" },
    { label: "Map Institution Name", type: "text", name: "MapInstitutionName" },
    { label: "Registered In Map", type: "checkbox", name: "RegisteredInMap" },
    { label: "Comments", type: "text", name: "Comments" },
  ];

  if (codeType === "donors") {
    fieldData.push({
      label: "Funded Project Ids",
      type: "text",
      name: "fundedProjectIds",
      required: !isEditForm,
    });
  }

  if (codeType === "financialCodes") {
    fieldData.push({
      label: "descriptionPt",
      type: "text",
      name: "descriptionPt",
      required: !isEditForm,
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        {fieldData.map((field, index) => (
          <FormField
            key={index}
            value={promoter && promoter[field.name]}
            {...field}
            handleInputChange={handleInputChange}
          />
        ))}
        <button
          type="submit"
          className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 col-span-6"
        >
          {formType} Actor
        </button>
      </form>
    </div>
  );
};

export default PromoterForm;
