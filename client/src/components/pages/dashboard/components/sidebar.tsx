import { Loader } from "@/components/common";
import { closeSidebar, useGetProfileQuery } from "@/features";
import { useAppDispatch, useAppSelector, useTranslation } from "@/hooks";
import { Link2, Palette, Settings, BarChart3, X } from "lucide-react";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
  const {t} = useTranslation()
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const { data, isLoading } = useGetProfileQuery("");
  const location = useLocation();

  const tabs = [
    { url: "links", label: t("dashboard.sidebar.links"), icon: Link2 },
    { url: "design", label: t("dashboard.sidebar.design"), icon: Palette },
    { url: "analytics", label: t("dashboard.sidebar.analytics"), icon: BarChart3 },
    { url: "settings", label: t("dashboard.sidebar.settings"), icon: Settings },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <aside className="space-y-2">
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center text-2xl overflow-hidden">
              {data?.avatar !== "" ? <img className="w-full h-full object-cover" src={data?.avatar} /> : <>{data?.name[0]}</>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate text-sm">{data?.name}</div>
              <Link to="settings" className="text-muted-foreground text-xs hover:underline">
                {t("dashboard.sidebar.edit")}
              </Link>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">konn.uz/{data?.username}</div>
        </div>

        <nav className="space-y-2 hidden lg:block">
          {tabs.map((tab) => (
            <Link
              to={tab.url}
              key={tab.url}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname.split("/")[2] === tab.url
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
              onClick={() => dispatch(closeSidebar())}
              to={tab.url}
              key={tab.url}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname.split("/")[2] === tab.url
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
