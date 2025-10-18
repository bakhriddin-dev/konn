import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { account, client } from "@/utils/appwrite";

export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get();
        setUser(res);

        const jwt = await account.createJWT();
        client.setJWT(jwt.jwt);
      } catch {
        console.error("User not logged in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="bg-background fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/kirish" />;
  }

  return children;
};
