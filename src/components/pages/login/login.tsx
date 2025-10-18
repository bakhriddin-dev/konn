import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Login = () => {
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
            <h1 className="text-3xl font-bold mb-2">Konn.uz ga xush kelibsiz</h1>
            <p className="text-muted-foreground">Davom etish uchun hisobingizga kiring</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 md:p-8 shadow-xl flex flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-semibold">Hisobingizga kiring</h2>
            <p className="text-muted-foreground text-sm">Faqat Google orqali kirish mumkin</p>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-gray-300 bg-white hover:bg-gray-100 transition-all hover:scale-[1.02]"
            >
              {/* Google Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.94 0 6.6 1.7 8.12 3.13l5.89-5.89C34.44 3.29 29.64 1 24 1 14.91 1 7.19 6.64 4.08 14.26l6.89 5.36C12.41 13.1 17.73 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.5 24.49c0-1.57-.14-3.08-.41-4.49H24v8.49h12.7c-.55 2.96-2.18 5.48-4.65 7.18l7.12 5.53C43.91 37.39 46.5 31.49 46.5 24.49z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.97 28.6c-.67-1.96-1.05-4.06-1.05-6.22s.38-4.26 1.05-6.22l-6.89-5.36C2.97 14.02 2 18.84 2 24s.97 9.98 2.08 13.2l6.89-5.36z"
                />
                <path
                  fill="#4285F4"
                  d="M24 46c6.48 0 11.91-2.15 15.88-5.85l-7.12-5.53c-2 1.36-4.57 2.16-8.76 2.16-6.27 0-11.59-3.6-13.03-8.86l-6.89 5.36C7.19 41.36 14.91 46 24 46z"
                />
              </svg>
              Google orqali kirish
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Kirish orqali siz{" "}
            <Link to="/foydalanish-shartlari" className="underline hover:text-primary">
              foydalanish shartlari
            </Link>
            ga rozilik bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
};
