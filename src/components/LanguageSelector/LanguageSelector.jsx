import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../redux/slices/languageSlice";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.language);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <select
      className="text-left border border-gray-400 rounded px-4 py-2 pl-2 pr-8"
      value={currentLanguage}
      onChange={handleLanguageChange}
    >
      <option value="en">English</option>
      <option value="pt">Portuguese</option>
    </select>
  );
};

export default LanguageSelector;
