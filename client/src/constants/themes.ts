export type ThemeType =
  | 'default'
  | 'minimal'
  | 'gradient'
  | 'dark'
  | 'neon'
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'pastel'
  | 'glass'
  | 'retro'
  | 'gold'
  | 'night-sky'
  | 'lavender'
  | 'cyberpunk';

export const themes = [
  {
    id: "default" as ThemeType,
    name: "Default",
    description: "themes.default",
    bg: "bg-gray-50",
    text: "text-gray-800",
    accent: "bg-blue-500",
    linkBg: "bg-white",
    linkBorder: "border-gray-200",
  },
  {
    id: "minimal" as ThemeType,
    name: "Minimal",
    description: "themes.minimal",
    bg: "bg-white",
    text: "text-gray-900",
    accent: "bg-gray-900",
    linkBg: "bg-gray-100",
    linkBorder: "border-gray-200",
  },
  {
    id: "gradient" as ThemeType,
    name: "Gradient",
    description: "themes.gradient",
    bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
    text: "text-white",
    accent: "bg-white/20",
    linkBg: "bg-white/10 backdrop-blur-sm",
    linkBorder: "border-white/20",
  },
  {
    id: "dark" as ThemeType,
    name: "Dark",
    description: "themes.dark",
    bg: "bg-gray-900",
    text: "text-white",
    accent: "bg-purple-500",
    linkBg: "bg-white/5",
    linkBorder: "border-white/10",
  },
  {
    id: "neon" as ThemeType,
    name: "Neon",
    description: "themes.neon",
    bg: "bg-black",
    text: "text-cyan-400",
    accent: "bg-gradient-to-r from-cyan-400 to-pink-500",
    linkBg: "bg-cyan-500/10",
    linkBorder: "border-cyan-400/50",
  },
  {
    id: "ocean" as ThemeType,
    name: "Ocean",
    description: "themes.ocean",
    bg: "bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400",
    text: "text-white",
    accent: "bg-white/20",
    linkBg: "bg-white/10 backdrop-blur-sm",
    linkBorder: "border-white/30",
  },
  {
    id: "forest" as ThemeType,
    name: "Forest",
    description: "themes.forest",
    bg: "bg-gradient-to-br from-green-800 via-emerald-700 to-lime-600",
    text: "text-emerald-100",
    accent: "bg-emerald-400",
    linkBg: "bg-emerald-900/30",
    linkBorder: "border-emerald-500/30",
  },
  {
    id: "sunset" as ThemeType,
    name: "Sunset",
    description: "themes.sunset",
    bg: "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600",
    text: "text-white",
    accent: "bg-white/30",
    linkBg: "bg-white/10 backdrop-blur-sm",
    linkBorder: "border-white/20",
  },
  {
    id: "pastel" as ThemeType,
    name: "Pastel",
    description: "themes.pastel",
    bg: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100",
    text: "text-gray-800",
    accent: "bg-purple-300",
    linkBg: "bg-white/70 backdrop-blur-sm",
    linkBorder: "border-purple-200",
  },
  {
    id: "glass" as ThemeType,
    name: "Glass",
    description: "themes.glass",
    bg: "bg-gradient-to-br from-slate-200/40 to-slate-400/40 backdrop-blur-lg",
    text: "text-gray-900",
    accent: "bg-white/30",
    linkBg: "bg-white/20 backdrop-blur-sm",
    linkBorder: "border-white/30",
  },
  {
    id: "retro" as ThemeType,
    name: "Retro",
    description: "themes.retro",
    bg: "bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500",
    text: "text-purple-900",
    accent: "bg-teal-400",
    linkBg: "bg-white/40",
    linkBorder: "border-purple-200",
  },
  {
    id: "gold" as ThemeType,
    name: "Gold",
    description: "themes.gold",
    bg: "bg-gradient-to-br from-yellow-500 via-amber-400 to-orange-500",
    text: "text-white",
    accent: "bg-white/30",
    linkBg: "bg-white/20 backdrop-blur-sm",
    linkBorder: "border-white/30",
  },
  {
    id: "night-sky" as ThemeType,
    name: "Night Sky",
    description: "themes.nightsky",
    bg: "bg-gradient-to-b from-indigo-900 via-purple-900 to-black",
    text: "text-indigo-200",
    accent: "bg-indigo-500",
    linkBg: "bg-indigo-900/30",
    linkBorder: "border-indigo-500/40",
  },
  {
    id: "lavender" as ThemeType,
    name: "Lavender",
    description: "themes.lavender",
    bg: "bg-gradient-to-br from-purple-200 via-violet-300 to-indigo-200",
    text: "text-gray-800",
    accent: "bg-purple-400",
    linkBg: "bg-white/60",
    linkBorder: "border-purple-200",
  },
  {
    id: "cyberpunk" as ThemeType,
    name: "Cyberpunk",
    description: "themes.cyberpunk",
    bg: "bg-gradient-to-br from-fuchsia-700 via-purple-800 to-black",
    text: "text-cyan-400",
    accent: "bg-gradient-to-r from-cyan-500 to-pink-600",
    linkBg: "bg-cyan-400/10",
    linkBorder: "border-cyan-400/40",
  },
];
