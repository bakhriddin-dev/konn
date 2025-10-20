import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-md relative z-10 text-center">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold">Sahifa topilmadi</h2>
          <p className="text-muted-foreground text-sm">Afsuski, siz izlagan sahifa mavjud emas.</p>

          <Link to="/" replace>
            <Button className="mt-4">Bosh sahifaga qaytish</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
