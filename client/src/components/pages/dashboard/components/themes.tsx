import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { themes, ThemeType } from "@/constants/themes";
import { useGetProfileQuery } from "@/features";
import { useUpdateMeMutation } from "@/features/api/api-slice";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks";

export const ThemesTab = () => {
  const {t} = useTranslation()
  const { data: user, isLoading } = useGetProfileQuery("");
  const [updateMe, { isLoading: isUpdateLoading }] = useUpdateMeMutation();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(user?.theme);
  const [visibleCount, setVisibleCount] = useState(themes.length);

  const handleThemeChange = (themeId: ThemeType) => {
    setSelectedTheme(themeId);
  };

  const handleSaveTheme = async () => {
    await updateMe({ theme: selectedTheme });
    toast.success(t("dashboard.themes.themechange"));
  };

  const currentTheme = themes.find((t) => t.id === selectedTheme) || themes[2];

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!isLoading) {
      setSelectedTheme(user?.theme);
    }
  }, [user]);

  useEffect(() => {
    if (isMobile) {
      setVisibleCount(3);
    } else {
      setVisibleCount(themes.length);
    }
  }, [isMobile]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t("dashboard.sidebar.design")}</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Theme selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t("dashboard.themes.picktheme")}</h3>
            <Button onClick={handleSaveTheme} disabled={isUpdateLoading}>
              {isUpdateLoading ? t("dashboard.themes.saving") : t("dashboard.themes.save")}
            </Button>
          </div>
          {themes.slice(0, visibleCount).map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => handleThemeChange(theme.id)}
                className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedTheme === theme.id
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-border hover:border-purple-500/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl ${theme.bg} flex items-center justify-center shadow-lg ${theme.text === "text-white" ? "border border-white/10" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${theme.accent}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{(t(theme.description))}</p>
                    </div>
                  </div>
                  {selectedTheme === theme.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleCount < themes.length && (
          <Button
            variant="outline"
            onClick={() => setVisibleCount(themes.length)}
            className="text-sm max-w-max mx-auto"
          >
            Hammasini ko'rish
          </Button>
        )}

        {/* Live preview */}
        {!isLoading && user && (
          <div>
            <div className="sticky top-24">
              <div className="relative w-full max-w-[340px] mx-auto">
                <div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black rounded-[2.7rem] p-3 border border-black/50 shadow-2xl">
                  <div className="w-full h-[640px] rounded-[2rem] overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={selectedTheme}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-full rounded-[1.5rem] ${currentTheme.bg} px-4 py-6 overflow-y-auto scrollbar-hide flex flex-col justify-between`}
                        // className={`w-full h-full rounded-[1.5rem] ${currentTheme.bg} px-4 py-6 overflow-y-auto scrollbar-hide`}
                      >
                        {/* Profile section */}
                        <div>
                          <div className="text-center my-6">
                            <div
                              className={`w-20 h-20 rounded-full ${currentTheme.accent} mx-auto mb-3 flex items-center justify-center text-2xl overflow-hidden`}
                            >
                              {user?.avatar === "" ? (
                                <img src={user?.avatar} />
                              ) : (
                                <>{user?.name[0]}</>
                              )}
                            </div>
                            <h3 className={`font-semibold mb-1 ${currentTheme.text}`}>
                              {user?.name}
                            </h3>
                            <p className={`text-xs ${currentTheme.text} opacity-70`}>{user?.bio}</p>
                          </div>

                          {/* Links */}
                          <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`p-4 rounded-xl ${currentTheme.linkBg} border ${currentTheme.linkBorder}`}
                              >
                                <div
                                  className={`h-4 ${currentTheme.accent} rounded w-3/4 opacity-50`}
                                ></div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-center text-gray-400 py-3 opacity-70">
                          © 2025 konn.uz
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
