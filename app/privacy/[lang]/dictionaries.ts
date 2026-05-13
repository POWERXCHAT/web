import "server-only";
import enDictionary from "../../../public/translation/privacy/en.json";
import arDictionary from "../../../public/translation/privacy/ar.json";

const dictionaries = {
  en: enDictionary,
  ar: arDictionary,
};

export const getDictionary = async (locale: string) => {
  const validLocale = locale === "ar" || locale === "en" ? locale : "en";
  return dictionaries[validLocale as keyof typeof dictionaries];
};
