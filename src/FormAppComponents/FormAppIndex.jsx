/** @jsxImportSource @emotion/react */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./FormComponent";
import WaitingPage from "./WaitingPage";
import FormComponent2 from "./FormComponent2";
import { LanguageProvider } from "./LanguageContext";
import { css } from "@emotion/react";
import LanguageSelector from "./LanguageSelector";

const appStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding: 2em;
  font-family: "Lato", sans-serif;
  /* Space between LanguageSelector and FormComponent */
  & > * + * {
    margin-top: 1.5em;
  }
`;

const FormAppIndex = () => {
  return (
    <LanguageProvider>
      <div className="App2" css={appStyles}>
        <LanguageSelector />
        <h1 className="text-2xl font-semibold mb-4">
          Promoters' registration form
        </h1>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/:userEmail" element={<FormComponent2 />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
};

export default FormAppIndex;
