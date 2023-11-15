/** @jsxImportSource @emotion/react */
import React from "react";
import { translations } from "./translations";
import { useContext } from "react";
import { css } from "@emotion/react";
import { LanguageContext } from "./LanguageContext";

const radioGroupStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;

  label {
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    margin-bottom: 0.75em;
  }

  .radio-options {
    display: flex;
    flex-direction: column;
    input[type="radio"]:disabled + label::before {
      background-color: #f5f5f5;
      border-color: #d0d0d0;
      cursor: not-allowed;
    .radio-option {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;

      input[type="radio"] {
        display: none; // Hide the default radio button

        &:checked + label::before {
          background-color: #0077cc;
          border-color: #0077cc;
        }

        &:checked + label::after {
          transform: scale(1);
        }
      }

      label {
        font-family: 'Lato', sans-serif;
        position: relative;
        padding-left: 30px;
        cursor: pointer;

        &::before, &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        &::before {
          // Creates a circular border for the radio button
          width: 18px;
          height: 18px;
          border: 2px solid #e0e0e0;
          border-radius: 50%;
          transition: background-color 0.3s, border-color 0.3s;
        }

        
      }
    }
  }
`;

const RadioButtonGroup = ({
  label,
  name,
  value,
  onChange,
  translationKey,
  locked = false,
}) => {
  const { language } = useContext(LanguageContext);

  const options = translations[language]?.options[translationKey] || [];

  return (
    <div css={radioGroupStyles}>
      <label>{label}</label>
      <div className="radio-options">
        {options.map((option, index) => (
          <div key={index} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              id={`${name}-${index}`}
              disabled={locked}
            />
            <label htmlFor={`${name}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
