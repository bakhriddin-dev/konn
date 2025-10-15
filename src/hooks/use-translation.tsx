import { StorageKeys } from "@/constants";
import { locales } from "@/constants/locales";
import { Storage } from "@/utils/storage";
import { useState } from "react";

type Language = "uz" | "en";

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(Storage.get(StorageKeys.lang) || "uz");

  const t = (key: string) => locales[key]?.[currentLanguage] || key;

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    Storage.set(StorageKeys.lang, language);
  };

  return { t, setLanguage };
};
