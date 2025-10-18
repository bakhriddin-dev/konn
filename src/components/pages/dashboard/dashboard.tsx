import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import { useEffect, useState } from "react";
import { account, client } from "@/utils/appwrite";
import { Loader } from "@/components/common";

export const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await account.get();
        setUser(res);

        const jwt = await account.createJWT();
        client.setJWT(jwt.jwt);
      } catch {
        window.location.href = "/kirish";
      }
    };
    getUser();
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="dark min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <Sidebar />

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
