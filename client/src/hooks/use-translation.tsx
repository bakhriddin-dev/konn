import { translations } from "@/utils/translations";
import { Language } from "@/types";
import { useState } from "react";

export const useTranslation = () => {
  const [currentLanguage] = useState(localStorage.getItem("lang") || "uz");

  const t = (key: string) => translations[key]?.[currentLanguage] || key;

  const setLanguage = (language: Language) => {
    localStorage.setItem("lang", language);
    window.location.reload();
  };

  return { t, setLanguage, currentLanguage };
};
