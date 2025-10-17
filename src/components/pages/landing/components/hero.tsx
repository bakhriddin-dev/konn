import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Youtube, Twitter, Globe, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";

export const Hero = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const mockLinks = [
    { icon: Youtube, label: t("hero.youtube"), color: "from-red-500 to-red-600" },
    { icon: Instagram, label: t("hero.instagram"), color: "from-purple-500 to-pink-500" },
    { icon: Twitter, label: "Twitter/X", color: "from-blue-400 to-blue-500" },
    { icon: Music, label: "Spotify", color: "from-green-500 to-green-600" },
    { icon: Globe, label: t("hero.site"), color: "from-orange-500 to-orange-600" },
  ];

  return (
    <section
      id="loyiha"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-2xl opacity-10" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-green-500/20 to-cyan-500/20 rounded-full blur-2xl opacity-10" />
      </div>

      <div className="md:px-4 container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
              >
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text font-semibold text-sm text-transparent">
                  #1 {t("hero.badge")}
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                {t("hero.title")}
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">{t("hero.subtitle")}</p>
            </div>

            <div className="space-y-4 max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl blur opacity-20"></div>
                <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-1 border border-border">
                  <div className="flex items-center gap-1 bg-background rounded-lg p-2">
                    <span className="text-muted-foreground px-2">konn.uz/</span>
                    <Input
                      type="text"
                      maxLength={50}
                      placeholder={t("hero.input")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-xs md:text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                    />
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 group"
              >
                {t("hero.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 border-2 border-background"
                  ></div>
                ))}
              </div>
              <div>
                <div className="font-semibold">100+</div>
                <div className="text-sm text-muted-foreground">{t("hero.activeusers")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative w-[350px] md:w-[370px] h-[670px] md:h-[700px]">
                {/* Phone frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[3rem] p-3 md:p-4 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20"></div>

                    {/* Screen content */}
                    <div className="w-full h-full overflow-y-auto scrollbar-hide px-4 py-6 md:p-6 !pt-12">
                      {/* Profile section */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mb-8"
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-3xl">👨‍💻</span>
                        </div>
                        <h3 className="text-white font-semibold mb-1">@konn</h3>
                        <p className="text-gray-400 text-sm">{t("hero.profile")}</p>
                      </motion.div>

                      {/* Links */}
                      <div className="space-y-3">
                        {mockLinks.map((link, index) => (
                          <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            onMouseEnter={() => setHoveredLink(index)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="relative group cursor-pointer"
                          >
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${link.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity`}
                            ></div>
                            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 md:py-3 px-4 hover:bg-white/10 transition-all">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center`}
                                >
                                  <link.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white flex-1">{link.label}</span>
                                <ArrowRight
                                  className={`w-5 h-5 text-gray-400 transition-transform ${hoveredLink === index ? "translate-x-1" : ""}`}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="hidden z-50 md:block absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl p-4 shadow-xl"
                >
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">1K+</div>
                    <div className="text-xs opacity-90">{t("hero.live")}</div>
                  </div>
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl -z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
