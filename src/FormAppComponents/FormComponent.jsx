/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import Dropdown from "./DropDown";
import { LanguageContext } from "./LanguageContext";
import RadioButtonGroup from "./RadioButtonGroup";
import { labels } from "./Labels";
import { useNavigate } from "react-router-dom";
import { defaultFormValues } from "./defaultFormValues";
import apiRequest from "../utils/api";
import { translations } from "./translations";
import { countries_en } from "./countries";

const formStyles = css`
  max-width: 500px;
  margin: 40px auto;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const submitButtonStyles = css`
  padding: 12px 25px;
  background-color: #0077cc;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #005fa3;
    transform: translateY(-2px);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  }
  &:active {
    transform: translateY(0);
  }
`;
const FormComponent = () => {
  const { language } = useContext(LanguageContext);

  const [formValues, setFormValues] = useState(defaultFormValues);

  const [ActorTypeID, setActorTypeID] = useState(0);
  const [CountryID, setCountryID] = useState(0);
  const [TargetedFarmerCommunitySizeID, setTargetedFarmerCommunitySizeID] =
    useState(0);

  let navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({});
  const handleSubmit = async (event) => {
    console.log("Submitting form...");
    event.preventDefault();

    if (!formValues.Email) {
      setErrors({
        Email:
          language === "en"
            ? "Email is required."
            : "Требуется электронная почта.",
      });
      return;
    }
    const updatedFormValues = {
      ...formValues,
      ActorTypeID: ActorTypeID + 1,
      DateOfRegistration: new Date().toISOString(),
      CountryID: CountryID + 1,
      TargetedFarmerCommunitySize: TargetedFarmerCommunitySizeID + 1,
    };

    setErrors({});
    console.log(updatedFormValues);

    try {
      console.log("Updated form values:", updatedFormValues);
      const data = await apiRequest("api/promoters", "POST", updatedFormValues);

      console.log("Data saved:", data);
      navigate(`/waiting?email=${encodeURIComponent(updatedFormValues.email)}`);
    } catch (error) {
      console.error(
        "Error saving data:",
        error.response ? error.response.status : error
      );
    }
  };

  function getTranslation(key, lang) {
    return labels[lang][key];
  }

  function getIdFromName(name, options, setID) {
    for (let i = 0; i < options.length; i++) {
      if (options[i] === name) {
        setID(i);
        break;
      }
    }
  }

  return (
    <form css={formStyles} onSubmit={handleSubmit}>
      <TextInput
        label={getTranslation("email", language)}
        name="Email"
        value={formValues.Email}
        onChange={handleInputChange}
        error={errors.Email}
      />
      <TextInput
        label={getTranslation("contactName", language)}
        name="ContactPersonName"
        value={formValues.ContactPersonName}
        onChange={handleInputChange}
      />
      <TextInput
        label={getTranslation("contactPreference", language)}
        name="PreferredContactMeans"
        value={formValues.PreferredContactMeans}
        onChange={handleInputChange}
      />
      <TextInput
        label={getTranslation("contactPosition", language)}
        name="ContactPersonPosition"
        value={formValues.ContactPersonPosition}
        onChange={handleInputChange}
      />
      <Dropdown
        label={getTranslation("actorType", language)}
        name="ActorType"
        value={formValues.ActorType}
        onChange={(event) => {
          getIdFromName(
            event.target.value,
            translations[language].options["actorType"],
            setActorTypeID
          );
          handleInputChange(event);
        }}
        translationKey="actorType"
      />
      <Dropdown
        label={getTranslation("country", language)}
        name="CountryID"
        value={formValues.CountryID}
        onChange={(event) => {
          getIdFromName(event.target.value, countries_en, setCountryID);
          handleInputChange(event);
        }}
        translationKey="countries"
      />
      <TextInput
        label={getTranslation("municipality", language)}
        name="Municipality"
        value={formValues.Municipality}
        onChange={handleInputChange}
      />
      <TextInput
        label={getTranslation("orgName", language)}
        name="OrganizationName"
        value={formValues.OrganizationName}
        onChange={handleInputChange}
      />

      <Dropdown
        label={getTranslation("orgType", language)}
        name="OrganizationType"
        value={formValues.OrganizationType}
        onChange={handleInputChange}
        translationKey="orgType"
      />
      <RadioButtonGroup
        label={getTranslation("ongoingProgram", language)}
        name="ExistingProgramStatus"
        value={String(formValues.ExistingProgramStatus)}
        onChange={handleInputChange}
        translationKey="ongoingProgram"
      />
      <Dropdown
        label={getTranslation("soilTopics", language)}
        name="TrainingInterest"
        value={formValues.TrainingInterest}
        onChange={handleInputChange}
        translationKey="soilTopics"
      />
      <Dropdown
        label={getTranslation("implementationScale", language)}
        name="ImplementationScale"
        value={formValues.ImplementationScale}
        onChange={handleInputChange}
        translationKey="implementationScale"
      />
      <RadioButtonGroup
        label={getTranslation("involveInstitutions", language)}
        name="InvolvementCapability"
        value={formValues.InvolvementCapability}
        onChange={handleInputChange}
        translationKey="involveInstitutions"
      />
      <Dropdown
        label={getTranslation("targetCommunitySize", language)}
        name="TargetedFarmerCommunitySize"
        value={String(formValues.TargetedFarmerCommunitySize)}
        onChange={(event) => {
          getIdFromName(
            event.target.value,
            translations[language].options["targetCommunitySize"],
            setTargetedFarmerCommunitySizeID
          );
          handleInputChange(event);
        }}
        translationKey="targetCommunitySize"
      />
      <RadioButtonGroup
        label={getTranslation("developedMaterials", language)}
        name="DevelopedEducationalMaterialStatus"
        value={String(formValues.DevelopedEducationalMaterialStatus)}
        onChange={handleInputChange}
        translationKey="developedMaterials"
      />
      <RadioButtonGroup
        label={getTranslation("accessToFunds", language)}
        name="AccessToFunds"
        value={String(formValues.AccessToFunds)}
        onChange={handleInputChange}
        translationKey="accessToFunds"
      />

      <RadioButtonGroup
        label={
          <span>
            {language === "en"
              ? "Did you read and agree with the "
              : language === "ru"
              ? "Вы прочитали и согласны с "
              : language === "fr"
              ? "Avez-vous lu et accepté le "
              : language === "es"
              ? "¿Has leído y estás de acuerdo con el "
              : "Did you read and agree with the "}
            <a
              href={
                language === "en"
                  ? "https://www.fao.org/fileadmin/user_upload/GSP/GSDP/documents/GSDP_TOR_promoters_EN_20_03_2023.pdf"
                  : language === "ru"
                  ? "https://www.fao.org/fileadmin/user_upload/GSP/Soil_doctor/GSDP_TOR_promoters_RU_20_03_2023_.pdf"
                  : language === "fr"
                  ? "https://www.fao.org/fileadmin/user_upload/GSP/GSDP/documents/GSDP_TOR_promoters_FR_20_03_2023.pdf"
                  : language === "es"
                  ? "https://www.fao.org/fileadmin/user_upload/GSP/GSDP/documents/GSDP_TOR_promoters_ES_20_03_2023.pdf"
                  : "https://www.fao.org/fileadmin/user_upload/GSP/GSDP/documents/GSDP_TOR_promoters_EN_20_03_2023.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === "en"
                ? "ToR"
                : language === "ru"
                ? "T3"
                : language === "fr"
                ? "termes de référence"
                : language === "es"
                ? "términos de referencia"
                : "ToR"}
            </a>
            {language === "en"
              ? "?"
              : language === "ru"
              ? "?"
              : language === "fr"
              ? "?"
              : language === "es"
              ? "?"
              : "?"}
          </span>
        }
        name="agreementWithToR"
        value={formValues.agreementWithToR}
        onChange={handleInputChange}
        translationKey="agreementWithToR"
      />
      <TextInput
        label={
          <>
            <span>
              {getTranslation("feedback", language)}
              <a href="mailto:Soil-doctor@fao.org">Soil-doctor@fao.org</a>
            </span>
          </>
        }
        name="Feedback"
        value={formValues.Feedback}
        onChange={handleInputChange}
      />

      <input
        css={submitButtonStyles}
        type="submit"
        value={getTranslation("submit", language)}
      />
    </form>
  );
};

export default FormComponent;
