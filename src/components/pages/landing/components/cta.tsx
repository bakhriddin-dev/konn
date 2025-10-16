import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-500">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-green-600 via-green-600 to-green-600 opacity-50"
                style={{ backgroundSize: "200% 200%" }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-12 md:p-16 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Bugun Konn.uz da profilingizni yarating
              </h2>

              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Bir daqiqada bepul sahifangizni yarating va havolalaringizni ulashishni boshlang
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 group">
                  Hoziroq boshlash
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
