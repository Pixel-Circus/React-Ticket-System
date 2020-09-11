import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import stringsEN from "./lang/en.json";
import stringsFR from "./lang/fr.json";
const ressources = {
  en: { translation: stringsEN },
  fr: { translation: stringsFR },
};
i18n.use(initReactI18next).init({
  resources: ressources,
  lng: "fr",
  //debug: true,
  /*react: {
    useSuspense: false,
  },*/
});
//console.log(ressources);
export default i18n;
