import { useGetProfileQuery } from "@/features";
import { useGetStatsQuery } from "@/features/api/api-slice";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { TrendingUp, Eye, MousePointerClick, BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AnalyticsTab = () => {
  const { t } = useTranslation();
  const { data } = useGetProfileQuery("");
  const { data: chartData } = useGetStatsQuery("");

  const getTopLink = (links) => {
    if (!Array.isArray(links) || links.length === 0) return null;
    return links.reduce((best, cur) => ((cur.clicks ?? 0) > (best.clicks ?? 0) ? cur : best));
  };

  const getTopLinks = (links, topN = 4) => {
    if (!Array.isArray(links) || links.length === 0) return [];

    const totalClicks = links.reduce((sum, link) => sum + (link.clicks ?? 0), 0);

    const withPercentage = links.map((link) => ({
      ...link,
      percentage: totalClicks > 0 ? ((link.clicks ?? 0) / totalClicks) * 100 : 0,
    }));

    return withPercentage.sort((a, b) => b.clicks - a.clicks).slice(0, topN);
  };

  const stats = [
    {
      label: t("analytics.allclicks"),
      value: data?.totalClicks,
      icon: MousePointerClick,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: t("analytics.allviews"),
      value: data?.views,
      icon: Eye,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: t("analytics.activepercent"),
      value: `${data?.clickRetention.toFixed(2)}%`,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: t("analytics.toplink"),
      value: getTopLink(data?.links)?.title,
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="analitika" className="relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-4">Tahlil</h1>
      <div className="container mx-auto relative z-10">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-secondary/30 border border-border hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1 truncate">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity -z-10`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-4 md:p-6 rounded-2xl bg-secondary/30 border border-border"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("analytics.weekstats")}</h3>
              <p className="text-sm text-muted-foreground">{t("analytics.sees")}</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#a855f7"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#ec4899"
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-secondary/30 border border-border"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("analytics.toplinks")}</h3>
              <p className="text-sm text-muted-foreground">{t("analytics.clickratings")}</p>
            </div>
            <div className="space-y-4">
              {getTopLinks(data?.links).map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{link.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {link.clicks} ta {t("analytics.clicks")}
                    </span>
                  </div>
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${link?.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
