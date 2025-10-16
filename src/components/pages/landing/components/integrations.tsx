import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Music,
  ShoppingBag,
  Mail,
  MessageCircle,
  Twitch,
  Video,
} from "lucide-react";

export function Integrations() {
  const integrations = [
    { icon: Instagram, name: "Instagram", color: "from-purple-500 to-pink-500" },
    { icon: Youtube, name: "YouTube", color: "from-red-500 to-red-600" },
    { icon: Twitter, name: "Twitter/X", color: "from-blue-400 to-blue-500" },
    { icon: Facebook, name: "Facebook", color: "from-blue-600 to-blue-700" },
    { icon: Linkedin, name: "LinkedIn", color: "from-blue-500 to-blue-600" },
    { icon: Github, name: "GitHub", color: "from-gray-700 to-gray-800" },
    { icon: Music, name: "Spotify", color: "from-green-500 to-green-600" },
    { icon: ShoppingBag, name: "Shopify", color: "from-green-600 to-green-700" },
    { icon: Mail, name: "Email", color: "from-orange-500 to-orange-600" },
    { icon: MessageCircle, name: "Telegram", color: "from-blue-400 to-blue-500" },
    { icon: Twitch, name: "Twitch", color: "from-purple-600 to-purple-700" },
    { icon: Video, name: "TikTok", color: "from-gray-800 to-black" },
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Barcha platformalar bilan integratsiya
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sevimli ilovalaringiz va xizmatlaringizni ulang
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-secondary/30 border border-border hover:border-purple-500/50 transition-all duration-200">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <integration.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center text-sm font-medium">{integration.name}</div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity -z-10`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional integrations badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <span className="text-muted-foreground">50+ boshqa integratsiyalar</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
