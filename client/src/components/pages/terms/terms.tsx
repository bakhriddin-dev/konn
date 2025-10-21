import { useTranslation } from "@/hooks";

export const Terms = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <h2 className="text-2xl font-semibold mb-4">{t("terms.title")}</h2>
      <p className="leading-relaxed">
        {t("terms.text1")}
      </p>
      <p className="leading-relaxed mt-4">
        {t("terms.text2")}
      </p>
    </div>
  );
};
