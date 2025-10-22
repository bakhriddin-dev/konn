import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { Link } from "react-router";

export function Showcase() {
  const { t } = useTranslation();
  const profiles = [
    {
      name: "Dilnoza Karimova",
      username: "@dilnoza.style",
      category: t("showcase.description_1"),
      avatar: "👗",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      views: "334",
      link: "1f5d3d9a-2a14-4a89-bc4c-8d9a129eb0df",
    },
    {
      name: "Rustam Bek",
      username: "@rustamtech",
      category: t("showcase.description_2"),
      avatar: "💻",
      gradient: "from-blue-500 via-indigo-500 to-cyan-500",
      views: "678",
      link: "b28f99d7-9a62-44c3-81a9-32fd134a2a8b",
    },
    {
      name: "Anastasia Volkova",
      username: "@nastiacooks",
      category: t("showcase.description_3"),
      avatar: "🍰",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      views: "2208",
      link: "67a02cb8-1b9b-471b-a019-20bdb9e6f617",
    },
    {
      name: "Javohir Fit",
      username: "@javohirfit",
      category: t("showcase.description_4"),
      avatar: "🏋️‍♂️",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      views: "1145",
      link: "f41c4cf9-d7ff-4f6e-b7ac-4e0970ad1fd8",
    },
    {
      name: "Elena Petrova",
      username: "@elena.music",
      category: t("showcase.description_5"),
      avatar: "🎶",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      views: "601",
      link: "4a331d2b-6f7f-43de-bd8c-726b40e55f35",
    },
    {
      name: "Azizbek Nur",
      username: "@azizshoots",
      category: t("showcase.description_6"),
      avatar: "📷",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      views: "214",
      link: "aa64eac2-9b84-4c72-8f20-9207f8456a9a",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{t("showcase.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full rounded-2xl bg-secondary/30 border border-border hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                {/* Gradient header */}
                <div className={`h-32 bg-gradient-to-r ${profile.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{profile.views}</span>
                    </div>
                  </div>
                </div>

                {/* Profile content */}
                <div className="p-6 relative -mt-12">
                  <div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-4xl mb-4 border-4 border-background shadow-xl`}
                  >
                    {profile.avatar}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-1">{profile.name}</h3>
                    <p className="text-purple-400 text-sm mb-1">{profile.username}</p>
                    <p className="text-muted-foreground text-sm">{profile.category}</p>
                  </div>

                  {/* Mock links preview */}
                  <div className="space-y-2 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-10 bg-white/5 rounded-lg border border-white/10"
                      ></div>
                    ))}
                  </div>

                  <Link to={`https://konn.uz/${profile.link}`} target="_blank">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-cyan:to-pink-500 group-hover:border-transparent group-hover:text-white transition-all"
                    >
                      {t("showcase.button")}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
