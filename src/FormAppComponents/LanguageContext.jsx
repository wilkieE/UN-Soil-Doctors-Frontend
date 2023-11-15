import React, { useState, createContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = (props) => {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
