import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function Theme() {
  const { t } = useTranslation();
  const [selectedTheme, setSelectedTheme] = useState(0);

  const themes = [
    {
      name: "Minimal",
      id: "minimal",
      bg: "bg-white",
      text: "text-gray-900",
      accent: "bg-gray-900",
      linkBg: "bg-gray-100",
      linkBorder: "border-gray-200",
    },
    {
      name: "Gradient",
      id: "gradient",
      bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
      text: "text-white",
      accent: "bg-white/20",
      linkBg: "bg-white/10 backdrop-blur-sm",
      linkBorder: "border-white/20",
    },
    {
      name: "Dark",
      id: "dark",
      bg: "bg-gray-900",
      text: "text-white",
      accent: "bg-purple-500",
      linkBg: "bg-white/5",
      linkBorder: "border-white/10",
    },
    {
      name: "Neon",
      id: "neon",
      bg: "bg-black",
      text: "text-cyan-400",
      accent: "bg-gradient-to-r from-cyan-400 to-pink-500",
      linkBg: "bg-cyan-500/10",
      linkBorder: "border-cyan-400/50",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{t("theme.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("theme.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Theme selector */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {themes.map((theme, index) => (
              <motion.div
                key={theme.id}
                onClick={() => setSelectedTheme(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTheme === index
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-border bg-secondary/30 hover:border-purple-500/50"
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
                      <h3 className="text-xl font-semibold mb-1">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 && t("theme.minimal")}
                        {index === 1 && t("theme.gradient")}
                        {index === 2 && t("theme.dark")}
                        {index === 3 && t("theme.neon")}
                      </p>
                    </div>
                  </div>
                  {selectedTheme === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-[350px] md:w-[370px] h-[670px] md:h-[700px]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-full h-full rounded-[2rem] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTheme}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`w-full h-full rounded-[2.5rem] pt-12 ${themes[selectedTheme].bg} p-6 overflow-y-auto scrollbar-hide`}
                    >
                      {/* Profile section */}
                      <div className="text-center mb-6">
                        <div
                          className={`w-20 h-20 rounded-full ${themes[selectedTheme].accent} mx-auto mb-3`}
                        ></div>
                        <h3 className={`font-semibold mb-1 ${themes[selectedTheme].text}`}>
                          {t("theme.username")}
                        </h3>
                        <p className={`text-sm ${themes[selectedTheme].text} opacity-70`}>
                          {t("theme.bio")}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`p-4 rounded-xl ${themes[selectedTheme].linkBg} border ${themes[selectedTheme].linkBorder}`}
                          >
                            <div
                              className={`h-4 ${themes[selectedTheme].accent} rounded w-3/4 opacity-50`}
                            ></div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[2.5rem] blur-xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
