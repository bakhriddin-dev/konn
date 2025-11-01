import { Link } from "react-router";
import { GoogleLoginButton } from "./login-button";
import { useTranslation } from "@/hooks";

export const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br mb-4">
              <img src="/icons/logo.png" alt="Logo" className="rounded-md" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t("login.welcome")}</h1>
            <p className="text-muted-foreground">{t("login.next")}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 md:p-8 shadow-xl flex flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-semibold">{t("login.login")}</h2>

            <GoogleLoginButton />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            <Link to="/foydalanish-shartlari" className="underline hover:text-primary">
              {t("login.terms")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
