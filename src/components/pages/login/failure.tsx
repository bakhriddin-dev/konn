import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { account } from "@/utils/appwrite";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common";

export const OAuthFailure = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (user) {
          console.log(user);
          navigate("/boshqaruv-paneli", { replace: true });
        }
      } catch {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    return <Loader />;
  }

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
