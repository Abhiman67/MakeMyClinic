import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";
import { FaArrowRight, FaRegHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fadeIn, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "./AnimationUtils";
import { useAnimation as useAnimationContext } from "./AnimationContext";

interface HeroProps {
  hospitals: string[];
  darkMode: boolean;
}

const Hero = ({ hospitals, darkMode }: HeroProps) => {
  const navigate = useNavigate();
  const { animationsEnabled } = useAnimationContext();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView && animationsEnabled) {
      controls.start("visible");
    }
  }, [controls, inView, animationsEnabled]);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center text-gray-900 dark:text-white overflow-hidden pt-20"
      ref={ref}
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 space-y-8"
            variants={fadeInLeft}
            initial="hidden"
            animate={controls}
          >
            <div>
              <motion.div 
                className="inline-block px-4 py-1 rounded-full bg-yellow-500 bg-opacity-20 text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-6"
                variants={fadeInLeft}
                initial="hidden"
                animate={controls}
                transition={{ delay: 0.3 }}
              >
                Next-Gen Healthcare Management
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-500">
                  Revolutionizing
                </span>
                <span className="block text-gray-900 dark:text-white mt-2">
                  Patient Care
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
                Streamline hospital operations, enhance patient experience, and optimize resource management with our intelligent healthcare platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleLogin}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started <FaArrowRight className="ml-2" />
              </motion.button>
              
              <Link
                to="features"
                smooth={true}
                duration={800}
                className="px-8 py-4 rounded-full border-2 border-yellow-600 border-opacity-30 dark:border-white dark:border-opacity-30 text-yellow-700 dark:text-white font-bold text-lg hover:bg-yellow-600 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                Explore Features
              </Link>
            </div>
            
            <div className="pt-8 flex items-center space-x-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-yellow-100 dark:border-yellow-900 bg-gradient-to-br from-yellow-500 to-amber-500 dark:from-yellow-400 dark:to-amber-400 opacity-75"></div>
                ))}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Trusted by <span className="text-yellow-600 dark:text-yellow-400 font-bold">500+</span> hospitals</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2 relative"
            variants={fadeInRight}
            initial="hidden"
            animate={controls}
          >
            {/* Interactive 3D Dashboard Visualization */}
            <DashboardVisualization />
          </motion.div>
        </div>
      </div>
      
      {/* Hospital Ticker */}
      <HospitalTicker hospitals={hospitals} />
    </section>
  );
};

// Dashboard Visualization Component
const DashboardVisualization = () => {
  return (
    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-yellow-100 dark:border-yellow-500/20 bg-gradient-to-br from-yellow-900 via-amber-900 to-yellow-800 aspect-[16/10]">
      {/* Background elements and effects */}
      <div className="absolute inset-0">
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px]"></div>
        </div>
        
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-amber-500/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
              x: [0, -20, 0],
              y: [0, 20, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-2/3 right-1/3 w-40 h-40 bg-yellow-500/20 rounded-full blur-xl"
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 15, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Particle effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                opacity: 0.3 + Math.random() * 0.5,
                scale: 0.4 + Math.random() * 0.6
              }}
              animate={{ 
                y: [0, -20, 0, 20, 0],
                x: [0, 10, 0, -10, 0],
                opacity: [0.4, 0.8, 0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Connection lines radiating from center */}
        <div className="absolute w-full h-full">
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const length = 150;
            const endX = Math.cos(angle) * length;
            const endY = Math.sin(angle) * length;
            
            return (
              <motion.div 
                key={i}
                className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-yellow-400/80 to-transparent"
                style={{ 
                  width: length, 
                  transformOrigin: '0 0',
                  rotate: `${i * 45}deg`
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1, 1, 0],
                  opacity: [0, 0.8, 0.8, 0.8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
              />
            );
          })}
        </div>
        
        {/* Data nodes around the center */}
        <div className="absolute w-full h-full">
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const distance = 120;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 shadow-lg shadow-yellow-500/30 flex items-center justify-center"
                style={{ 
                  marginLeft: -8,
                  marginTop: -8,
                  x, 
                  y 
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1, 1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(99, 102, 241, 0)",
                    "0 0 0 0 rgba(99, 102, 241, 0.3)",
                    "0 0 10px 2px rgba(99, 102, 241, 0.5)",
                    "0 0 0 0 rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.7,
                  times: [0, 0.1, 0.5, 1]
                }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ 
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Central hospital icon with enhanced effects */}
        <div className="relative z-20">
          {/* Outer glow ring */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 blur-md"
            animate={{ 
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ margin: -8 }}
          />
          
          <motion.div 
            className="relative z-10 w-32 h-32 bg-gradient-to-br from-white to-yellow-100 dark:from-yellow-800 dark:to-amber-900 rounded-full flex items-center justify-center shadow-xl"
            animate={{ 
              y: [0, -10, 0],
              rotateZ: [0, 5, 0, -5, 0],
              boxShadow: [
                "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                "0 20px 30px -10px rgba(99, 102, 241, 0.6)",
                "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-200 dark:border-yellow-600"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.95, 1, 0.95]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <FaRegHospital className="w-16 h-16 text-yellow-600 dark:text-yellow-300" />
          </motion.div>
        </div>

        {/* Animated pulse rings with enhanced effects */}
        <div className="absolute w-48 h-48">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-yellow-400/70 dark:border-yellow-300/70"
              initial={{ opacity: 0.7, scale: 0.8 }}
              animate={{ 
                opacity: 0,
                scale: 2.5,
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: i * 0.8,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Data transfer animations */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => {
            const startAngle = (i * 72) * (Math.PI / 180);
            const endAngle = ((i * 72) + 180) % 360 * (Math.PI / 180);
            const startDistance = 60;
            const endDistance = 140;
            
            const startX = Math.cos(startAngle) * startDistance;
            const startY = Math.sin(startAngle) * startDistance;
            const endX = Math.cos(endAngle) * endDistance;
            const endY = Math.sin(endAngle) * endDistance;
            
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-500/50"
                initial={{ 
                  x: startX, 
                  y: startY,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: [startX, endX],
                  y: [startY, endY],
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 1.2,
                  times: [0, 0.1, 0.9, 1]
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Digital overlay with enhanced animations */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-900/95 via-yellow-900/80 to-transparent h-2/5 backdrop-blur-sm flex items-end">
        <div className="w-full p-6">
          {/* Top status bar */}
          <div className="flex justify-between items-center mb-4">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div 
                className="h-3 w-3 rounded-full bg-green-400 mr-2"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                  boxShadow: [
                    "0 0 0 0 rgba(74, 222, 128, 0.4)",
                    "0 0 0 10px rgba(74, 222, 128, 0)",
                    "0 0 0 0 rgba(74, 222, 128, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="text-sm text-yellow-200 uppercase tracking-wider font-medium"
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  textShadow: [
                    "0 0 0 rgba(255, 255, 255, 0)",
                    "0 0 8px rgba(255, 255, 255, 0.3)",
                    "0 0 0 rgba(255, 255, 255, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                System Online
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {["CPU", "Memory", "Network"].map((metric, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-xs text-yellow-300/80 mb-1">{metric}</div>
                  <motion.div 
                    className="h-1.5 w-20 bg-yellow-200/20 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-400"
                      initial={{ width: "20%" }}
                      animate={{ width: ["30%", "80%", "50%"] }}
                      transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Main metrics dashboard */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {[
              { title: "Patient Flow", value: "+12%", color: "green", icon: "📈", subtext: "vs last week" },
              { title: "Resource Usage", value: "68%", color: "amber", icon: "⚡", subtext: "optimal" },
              { title: "AI Predictions", value: "94%", color: "amber", icon: "🧠", subtext: "accuracy" }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10 relative overflow-hidden"
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: `rgba(${metric.color === 'green' ? '74, 222, 128' : metric.color === 'amber' ? '96, 165, 250' : '167, 139, 250'}, 0.5)`,
                  y: -2
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="absolute -right-4 -top-4 text-2xl opacity-10"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {metric.icon}
                </motion.div>
                <div className="text-xs text-yellow-200/80 mb-1">{metric.title}</div>
                <div className="flex items-baseline">
                  <motion.span 
                    className={`text-${metric.color}-400 font-bold text-lg mr-1`}
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      textShadow: [
                        `0 0 0 rgba(${metric.color === 'green' ? '74, 222, 128' : metric.color === 'amber' ? '96, 165, 250' : '167, 139, 250'}, 0)`,
                        `0 0 10px rgba(${metric.color === 'green' ? '74, 222, 128' : metric.color === 'amber' ? '96, 165, 250' : '167, 139, 250'}, 0.5)`,
                        `0 0 0 rgba(${metric.color === 'green' ? '74, 222, 128' : metric.color === 'amber' ? '96, 165, 250' : '167, 139, 250'}, 0)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {metric.value}
                  </motion.span>
                  <span className="text-xs text-yellow-300/70">{metric.subtext}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Activity indicators */}
          <motion.div 
            className="flex flex-wrap gap-3 text-xs text-yellow-300/90 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            {[
              { label: "Processing Data", color: "amber" },
              { label: "AI Optimizing", color: "amber" },
              { label: "Real-time Updates", color: "green" },
              { label: "Syncing", color: "yellow" },
              { label: "Security Scan", color: "red" }
            ].map((status, i) => (
              <motion.div
                key={i}
                className="flex items-center bg-white/5 px-2 py-1 rounded-full"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <motion.div 
                  className={`h-1.5 w-1.5 rounded-full bg-${status.color}-400 mr-1.5`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.3 
                  }}
                />
                {status.label}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Bottom data ticker */}
          <motion.div
            className="mt-4 pt-3 border-t border-white/10 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <div className="text-xs text-yellow-300/70 mr-2">LIVE DATA:</div>
            <div className="overflow-hidden flex-1">
              <motion.div
                className="whitespace-nowrap text-xs text-yellow-200/90"
                animate={{ x: [0, -500] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear"
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="inline-block mx-4">
                    {["Patient admission rate: 12/hr", "Average wait time: 8 min", "Staff efficiency: 94%", "Resource allocation: optimal", "AI prediction confidence: high"][i % 5]}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Hospital Ticker Component
const HospitalTicker = ({ hospitals }: { hospitals: string[] }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 backdrop-blur-md bg-gradient-to-r from-yellow-600/80 to-amber-600/80 border-t border-white/10 z-10">
      <div className="h-full flex items-center overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-yellow-600/90 to-transparent z-10 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
            <FaRegHospital className="text-white w-4 h-4" />
          </div>
        </div>
        
        <motion.div
          className="flex items-center space-x-6 pl-16"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ 
            duration: 80, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          {hospitals.map((hospital, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white whitespace-nowrap">{hospital}</span>
            </div>
          ))}
        </motion.div>
        
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-amber-600/90 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default Hero; 