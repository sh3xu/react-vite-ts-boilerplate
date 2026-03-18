import { CallToAction } from "./components/CallToAction";
import { Features } from "./components/Features";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <HeroSection />
      <Features />
      <CallToAction />
    </div>
  );
}
