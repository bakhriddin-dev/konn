import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const plans = [
    {
      name: "Bepul",
      price: "0",
      features: [
        { text: "Cheksiz havolalar", included: true },
        { text: "Asosiy sozlamalar", included: true },
        { text: "Tahlil", included: true },
        { text: "10 dan ortiq mavzular", included: true },
        { text: "Profilga avatar qo'yish", included: true },
        { text: "Mobil qurilmaga mos dizayn", included: true },
      ],
      highlighted: true,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Rejalar va narxlar</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O'zingizga mos keladigan rejani tanlang
          </p>
        </motion.div>

        <div className="max-w-sm mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className={`relative h-full p-8 rounded-3xl border ${
                  plan.highlighted
                    ? "border-green-500 bg-gradient-to-br from-green-500/10 to-cyan-500/10"
                    : "border-border bg-secondary/30"
                } hover:shadow-2xl transition-all duration-300`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full text-sm">
                    Mashhur
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold">{plan.price} so'm</span>
                    <span className="text-muted-foreground">/oyiga</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.included ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <X className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r text-white from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600"
                      : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  Rejani tanlash
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
