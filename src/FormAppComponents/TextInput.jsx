/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const textInputStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;

  label {
    font-family: "Lato", sans-serif;
    font-weight: 500;
    margin-bottom: 0.5em;
  }

  input {
    font-family: "Lato", sans-serif;
    padding: 10px 15px;
    width: calc(100% - 30px); // Reduced the width slightly to add spacing
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #0077cc;
      box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.2);
    }

    &::placeholder {
      color: #aaa;
    }

    &.locked {
      background-color: #f5f5f5;
      cursor: not-allowed;
      border-color: #d0d0d0;
    }
  }

  .error {
    margin-top: 0.5em;
    color: #d32f2f;
    font-size: 0.875em;
  }
`;

const TextInput = ({ label, name, value, onChange, error, locked = false }) => {
  return (
    <div css={textInputStyles}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={name === "email"}
        readOnly={locked}
        className={locked ? "locked" : ""}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TextInput;
