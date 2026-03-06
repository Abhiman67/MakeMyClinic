import { useState, useEffect } from "react";
import ModernNavbar from "../components/LandingPage/ModernNavbar";
import ModernHero from "../components/LandingPage/ModernHero";
import ModernFeatures from "../components/LandingPage/ModernFeatures";
import ModernHowItWorks from "../components/LandingPage/ModernHowItWorks";
import ModernInfo from "../components/LandingPage/ModernInfo";
import ModernPricing from "../components/LandingPage/ModernPricing";
import ModernTestimonials from "../components/LandingPage/ModernTestimonials";
import ModernBottomCTA from "../components/LandingPage/ModernBottomCTA";
import ModernFooter from "../components/LandingPage/ModernFooter";

const Landing = () => {
  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0B0F19] text-white selection:bg-yellow-500/30 font-poppins">
      <ModernNavbar />
      <ModernHero />
      <ModernFeatures />
      <ModernHowItWorks />
      <ModernInfo />
      <ModernPricing />
      <ModernTestimonials />
      <ModernBottomCTA />
      <ModernFooter />
    </div>
  );
};

export default Landing;
