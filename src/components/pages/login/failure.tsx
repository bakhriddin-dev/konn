import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const OAuthFailure = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Kirishda xatolik!</h2>
      <p className="text-muted-foreground mb-6">
        Google OAuth login amalga oshmadi. Iltimos, qayta urinib ko'ring.
      </p>
      <Link to="/kirish">
        <Button>Login sahifasiga qaytish</Button>
      </Link>
    </div>
  );
};
