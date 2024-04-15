import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const locale = i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init(
    {
      preload: ["en-US", "ar"],
      interpolation: {
        escapeValue: true,
      },
      debug: true,
      detection: {
        order: ["querystring", "navigator", "htmlTag"],
        lookupQuerystring: "lang",
      },
      backend: {
        loadPath: "./translations/{{lng}}.json",
      },
    },
    (err, t) => {
      if (err) return console.error(err);
    }
  );
