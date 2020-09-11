import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import stringsEN from "./lang/en.json";
import stringsFR from "./lang/fr.json";
const ressources = {
  en: { translation: stringsEN },
  fr: { translation: stringsFR },
};
i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources: ressources,
    fallbackLng: "fr",
    cookie: "lang",
    defaultLanguage: "fr",
    otherLanguage: ["en"],
    serverLanguageDetection: true,
    browserLanguageDetection: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: true,
    /*react: {
    useSuspense: false,
  },*/
  });
//console.log(ressources);
export default i18n;
