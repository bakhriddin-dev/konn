import { StorageKeys } from "@/constants";
import { translations } from "@/utils/translations";
import { Language } from "@/types";
import { Storage } from "@/utils/storage";
import { useState } from "react";

export const useTranslation = () => {
  const [currentLanguage] = useState(Storage.get(StorageKeys.lang) || "uz");

  const t = (key: string) => translations[key]?.[currentLanguage] || key;

  const setLanguage = (language: Language) => {
    Storage.set(StorageKeys.lang, language);
    window.location.reload();
  };

  return { t, setLanguage, currentLanguage };
};
