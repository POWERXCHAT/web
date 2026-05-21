import "server-only";
import enDictionary from "../../../public/translation/login/en.json";
import arDictionary from "../../../public/translation/login/ar.json";

const dictionaries = {
  en: enDictionary,
  ar: arDictionary,
};

export const getDictionary = async (locale: string): Promise<Record<string, string>> => {
  const validLocale = locale === "ar" || locale === "en" ? locale : "en";
  return dictionaries[validLocale as keyof typeof dictionaries] as Record<string, string>;
};
