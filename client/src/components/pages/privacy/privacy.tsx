import { useTranslation } from "@/hooks";

export const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <h2 className="text-2xl font-semibold mb-4">{t("privacy.title")}</h2>
      <p className="leading-relaxed">{t("privacy.text1")}</p>
      <p className="leading-relaxed mt-4">{t("privacy.text2")}</p>
    </div>
  );
};
