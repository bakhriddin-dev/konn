import { Button } from "@/components/ui/button";
import { openSidebar, useGetProfileQuery } from "@/features";
import { useAppDispatch, useTranslation } from "@/hooks";
import { Eye, Menu } from "lucide-react";
import { Link } from "react-router";

export const Navbar = () => {
  const {t} = useTranslation()
  const dispatch = useAppDispatch();
  const { data } = useGetProfileQuery("");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <button
          onClick={() => dispatch(openSidebar())}
          className="p-2 bg-card border rounded-lg lg:hidden"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center">
            <img src="/icons/logo.png" alt="Logo" className="rounded-md" />
          </div>
          <span className="text-xl font-bold">Konn</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/${data?.username}`} target="_blank">
            <Button variant="outline" size="sm" className="gap-2 !p-2 h-auto">
              <Eye className="w-4 h-4" />
              <span className="hidden lg:inline">{t('dashboard.navbar.text')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
