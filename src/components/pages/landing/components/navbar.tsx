import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/types";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/utils/utils";
import { Link } from "react-router";
import { useGetProfileQuery } from "@/features";

export const Navbar = () => {
  const { t, setLanguage, currentLanguage } = useTranslation();
  const { data, isLoading } = useGetProfileQuery("");

  const languages = [
    { code: "uz" as Language, label: "O'zbekcha" },
    { code: "en" as Language, label: "English" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center">
              <img src="/icons/logo.png" alt="Logo" className="rounded-md" />
            </div>
            <span className="text-xl font-bold">Konn.uz</span>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 h-9 rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {languages.find((l) => l.code === currentLanguage)?.label}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      currentLanguage === lang.code ? "bg-accent" : ""
                    )}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            ) : data ? (
              <Link to="/dashboard/links">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center text-2xl overflow-hidden">
                  <img src={data.avatar} alt="" />
                </div>
              </Link>
            ) : (
              <Link to="login">
                <Button>{t("navbar.login")}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
