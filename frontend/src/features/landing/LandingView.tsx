import { Hero } from "@/features/landing/components/Hero";
import { SubNav } from "@/features/landing/components/SubNav";
import { PersonaSection } from "@/features/landing/components/PersonaSection";
import { CapabilitiesSection } from "@/features/landing/components/CapabilitiesSection";
import { MaturitySection } from "@/features/landing/components/MaturitySection";
import { IntegrationSection } from "@/features/landing/components/IntegrationSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * The landing/login route. Container that composes the ported sections and
 * runs the scroll-reveal observer once its content has mounted.
 */
export function LandingView() {
  useScrollReveal([]);

  return (
    <>
      <Hero />
      <SubNav />
      <PersonaSection />
      <CapabilitiesSection />
      <MaturitySection />
      <IntegrationSection />
    </>
  );
}
