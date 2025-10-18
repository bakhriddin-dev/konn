import { closeSidebar } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LayoutDashboard, Link2, Palette, Settings, BarChart3, X } from "lucide-react";
import { Link } from "react-router";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  const tabs = [
    { url: "umumiy", label: "Umumiy", icon: LayoutDashboard },
    { url: "havolalar", label: "Havolalar", icon: Link2 },
    { url: "dizayn", label: "Dizayn", icon: Palette },
    { url: "tahlil", label: "Tahlil", icon: BarChart3 },
    { url: "sozlamalar", label: "Sozlamalar", icon: Settings },
  ];

  return (
    <>
      <aside className="space-y-2">
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center text-2xl">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate text-sm">User</div>
              <Link to="sozlamalar" className="text-muted-foreground text-xs hover:underline">
                o'zgartirish
              </Link>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">konn.uz/username</div>
        </div>

        <nav className="space-y-2 hidden lg:block">
          {tabs.map((tab) => (
            <Link
              to={tab.url}
              key={tab.url}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                "umumiy" === tab.url
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-background border-r border-border p-4 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <div className="text-lg font-semibold">Menu</div>
          <button onClick={() => dispatch(closeSidebar())}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <Link
              to={tab.url}
              key={tab.url}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                "umumiy" === tab.url
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
