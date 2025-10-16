import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";

export function Showcase() {
  const profiles = [
    {
      name: "Dilnoza Karimova",
      username: "@dilnoza.style",
      category: "Мода и лайфстайл",
      avatar: "👗",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      views: "334",
    },
    {
      name: "Rustam Bek",
      username: "@rustamtech",
      category: "Технологии и гаджеты",
      avatar: "💻",
      gradient: "from-blue-500 via-indigo-500 to-cyan-500",
      views: "678",
    },
    {
      name: "Anastasia Volkova",
      username: "@nastiacooks",
      category: "Еда и рецепты",
      avatar: "🍰",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      views: "2208",
    },
    {
      name: "Javohir Fit",
      username: "@javohirfit",
      category: "Фитнес и мотивация",
      avatar: "🏋️‍♂️",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      views: "1145",
    },
    {
      name: "Elena Petrova",
      username: "@elena.music",
      category: "Музыка и творчество",
      avatar: "🎶",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      views: "601",
    },
    {
      name: "Azizbek Nur",
      username: "@azizshoots",
      category: "Фотография и путешествия",
      avatar: "📷",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      views: "214",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Mijozlarimiz Konn.uz dan foydalanmoqda
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Demo profillar orqali Konn.uz imkoniyatlarini ko'rib chiqing.
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

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-cyan:to-pink-500 group-hover:border-transparent group-hover:text-white transition-all"
                  >
                    Profilni ko'rish
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
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
