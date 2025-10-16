import { Analytics } from "./components/analytics";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Integrations } from "./components/integrations";
import { Navbar } from "./components/navbar";
import { Pricing } from "./components/pricing";
import { Showcase } from "./components/showcase";
import { Theme } from "./components/theme";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Theme />
        <Analytics />
        <Integrations />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};
