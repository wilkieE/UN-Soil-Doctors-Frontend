/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import { css } from "@emotion/react";
import { LanguageContext } from "./LanguageContext";

const languageSelectorStyles = css`
  font-family: "Lato", sans-serif;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  appearance: none; /* hides the default arrow in some browsers */
  position: relative;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.2);
  }

  /* Add a custom arrow for the dropdown */
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%);
  background-position: calc(100% - 15px) 50%, calc(100% - 10px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
`;

const LanguageSelector = () => {
  const { changeLanguage } = useContext(LanguageContext);

  return (
    <select css={languageSelectorStyles} onChange={changeLanguage}>
      <option value="en">English</option>
      <option value="ru">Russian</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>
  );
};

export default LanguageSelector;
