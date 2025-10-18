import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";

export const Dashboard = () => {
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
