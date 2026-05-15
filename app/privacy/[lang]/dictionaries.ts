import "server-only";
import enDictionary from "../../../public/translation/privacy/en.json";
import arDictionary from "../../../public/translation/privacy/ar.json";
import type { Dictionary } from "./widgets/PrivacyContent";

const dictionaries = {
  en: enDictionary as unknown as Dictionary,
  ar: arDictionary as unknown as Dictionary,
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const validLocale = locale === "ar" || locale === "en" ? locale : "en";
  return dictionaries[validLocale as keyof typeof dictionaries];
};
