import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBed } from "react-icons/fa";

// Import all the components
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import Features from "./Features";
import AdvancedFeatures from "./AdvancedFeatures";
import About from "./About";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Notification from "./Notification";

const LandingPage = () => {
  const hospitals = [
    "AIIMS Delhi",
    "Apollo Hospitals",
    "Fortis Healthcare",
    "Manipal Hospitals",
    "Max Healthcare",
    "Medanta Medicity",
    "Narayana Health",
    "Tata Memorial Hospital",
    "Kokilaben Hospital",
    "Artemis Hospital",
    "Lilavati Hospital Mumbai",
    "Christian Medical College Vellore",
    "Hinduja Hospital Mumbai",
    "KIMS Hyderabad",
    "Ruby Hall Clinic Pune",
    "Jaslok Hospital Mumbai",
    "Sankara Nethralaya Chennai",
    "Sir Ganga Ram Hospital Delhi",
    "Wockhardt Hospitals",
    "Bombay Hospital"
  ];
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Theme toggle state
  const [darkMode, setDarkMode] = useState(true);
  
  // Notification state for demo
  const [showNotification, setShowNotification] = useState(false);
  
  // Trigger notification in demo
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 3000);
    
    return () => clearTimeout(notificationTimer);
  }, []);
  
  // Handle scroll events for navbar styling and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
      
      // Determine active section based on scroll position
      const sections = ["home", "services", "features", "about", "testimonials"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <Navbar 
        isScrolled={isScrolled} 
        activeSection={activeSection} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      
      {/* Scroll to top button */}
      <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop} />

      {/* Notification popup */}
      <Notification showNotification={showNotification} setShowNotification={setShowNotification} />

      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-amber-50 to-amber-50 dark:from-gray-900 dark:via-yellow-900 dark:to-amber-900 text-gray-800 dark:text-gray-300 transition-colors duration-500">
        {/* Hero Section */}
        <Hero hospitals={hospitals} darkMode={darkMode} />

        {/* Services Section */}
        <Services />

        {/* Features Section */}
        <Features />

        {/* Advanced Features Section */}
        <AdvancedFeatures />

        {/* About Section */}
        <About />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Call to Action Section */}
        <CTA />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage; 