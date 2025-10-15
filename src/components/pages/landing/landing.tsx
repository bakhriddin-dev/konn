import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
};
