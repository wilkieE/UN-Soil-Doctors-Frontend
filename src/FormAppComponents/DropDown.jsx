/** @jsxImportSource @emotion/react */
import React from "react";
import { translations } from "./translations";
import { useContext } from "react";
import { css } from "@emotion/react";
import { LanguageContext } from "./LanguageContext";

const dropdownStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;

  label {
    font-family: "Lato", sans-serif;
    font-weight: 500;
    margin-bottom: 0.5em;
  }

  select {
    font-family: "Lato", sans-serif;
    padding: 10px 15px;
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
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
    background-position: calc(100% - 20px) 16px, calc(100% - 15px) 16px;
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
  }
`;

const Dropdown = ({ label, name, value, onChange, translationKey }) => {
  const { language } = useContext(LanguageContext);

  const options = translations[language]?.options[translationKey] || [];

  return (
    <div css={dropdownStyles}>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
