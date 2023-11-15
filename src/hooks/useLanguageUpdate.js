import { useEffect } from "react";
import { useSelector } from "react-redux";
import i18n from "../utils/i18n";

const useLanguageUpdate = () => {
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return null;
};

export default useLanguageUpdate;
