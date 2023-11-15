import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // use English if detected language is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
