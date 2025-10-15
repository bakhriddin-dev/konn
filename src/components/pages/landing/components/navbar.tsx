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

export function Navbar() {
  const { t, setLanguage, currentLanguage } = useTranslation();

  const languages = [
    { code: "uz" as Language, label: "O'zbekcha" },
    { code: "en" as Language, label: "English" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center">
              <span className="text-white font-bold">K</span>
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

            <Button>{t("landing.login")}</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
