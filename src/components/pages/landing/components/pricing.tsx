import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

export function Pricing() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.planfree"),
      price: "0",
      features: [
        { text: t("pricing.feature2"), included: true },
        { text: t("pricing.feature3"), included: true },
        { text: t("pricing.feature6"), included: true },
        { text: t("pricing.feature5"), included: true },
        { text: t("pricing.feature1"), included: false },
        { text: t("pricing.feature7"), included: false },
        { text: t("pricing.feature4"), included: false },
        { text: t("pricing.feature8"), included: false },
      ],
      highlighted: false,
    },
    {
      name: t("pricing.planpro"),
      price: "25.000",
      features: [
        { text: t("pricing.feature2"), included: true },
        { text: t("pricing.feature3"), included: true },
        { text: t("pricing.feature6"), included: true },
        { text: t("pricing.feature5"), included: true },
        { text: t("pricing.feature1"), included: true },
        { text: t("pricing.feature7"), included: true },
        { text: t("pricing.feature4"), included: true },
        { text: t("pricing.feature8"), included: true },
      ],
      highlighted: true,
    },
  ];

  return (
    <section id="narxlar" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t("pricing.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-4 justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group w-sm"
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
                    {t("pricing.favorite")}
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold">
                      {plan.price} {t("pricing.sum")}
                    </span>
                    <span className="text-muted-foreground">/{t("pricing.month")}</span>
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
                  {t("pricing.button")}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
