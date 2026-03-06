import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { 
  FaLaptopMedical, FaShieldAlt, FaMobileAlt, 
  FaUserNurse, FaAmbulance, FaFileMedical, FaArrowRight,
  FaBrain, FaChartLine, FaDatabase
} from "react-icons/fa";
import { fadeIn, fadeInUp, staggerContainer} from "./AnimationUtils";
import { useAnimation as useAnimationContext } from "./AnimationContext";

const AdvancedFeatures = () => {
  const { animationsEnabled } = useAnimationContext();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    if (inView && animationsEnabled) {
      controls.start("visible");
    }
  }, [controls, inView, animationsEnabled]);

  const advancedFeatures = [
    {
      icon: <FaLaptopMedical className="w-10 h-10 text-amber-600 dark:text-amber-400" />,
      title: "AI-Powered Predictions",
      description: "Forecast patient volumes and resource needs with 94% accuracy using advanced machine learning algorithms.",
      color: "amber",
      stats: [
        { label: "Prediction Accuracy", value: "94%" },
        { label: "Resource Optimization", value: "32%" }
      ]
    },
    {
      icon: <FaShieldAlt className="w-10 h-10 text-amber-600 dark:text-amber-400" />,
      title: "Secure Patient Data",
      description: "End-to-end encryption and compliance with healthcare regulations to protect sensitive patient information.",
      color: "amber",
      stats: [
        { label: "Data Encryption", value: "256-bit" },
        { label: "Compliance", value: "HIPAA" }
      ]
    },
    {
      icon: <FaMobileAlt className="w-10 h-10 text-green-600 dark:text-green-400" />,
      title: "Mobile Accessibility",
      description: "Access critical information on-the-go with our responsive mobile application for healthcare professionals.",
      color: "green",
      stats: [
        { label: "Device Support", value: "100%" },
        { label: "Offline Access", value: "Yes" }
      ]
    },
    {
      icon: <FaUserNurse className="w-10 h-10 text-red-600 dark:text-red-400" />,
      title: "Staff Optimization",
      description: "Intelligent scheduling and workload distribution to maximize staff efficiency and minimize burnout.",
      color: "red",
      stats: [
        { label: "Efficiency Increase", value: "28%" },
        { label: "Burnout Reduction", value: "45%" }
      ]
    },
    {
      icon: <FaAmbulance className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />,
      title: "Emergency Response",
      description: "Rapid resource allocation and coordination during emergencies to save critical time and lives.",
      color: "yellow",
      stats: [
        { label: "Response Time", value: "-40%" },
        { label: "Resource Allocation", value: "Real-time" }
      ]
    },
    {
      icon: <FaFileMedical className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />,
      title: "Integrated Records",
      description: "Seamless integration with existing EMR/EHR systems for comprehensive patient history and treatment plans.",
      color: "yellow",
      stats: [
        { label: "Integration Time", value: "< 48hrs" },
        { label: "Data Accuracy", value: "99.9%" }
      ]
    }
  ];


  return (
    <section className="py-24 relative overflow-hidden" id="advanced-features" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-yellow-950 dark:to-gray-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply opacity-10 blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply opacity-10 blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        {/* Floating icons */}
        {[FaBrain, FaChartLine, FaDatabase].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500/10 dark:text-yellow-300/10"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 30}%`,
              fontSize: `${5 + i}rem`
            }}
            animate={{
              y: [0, -20, 0, 20, 0],
              rotate: [0, 10, 0, -10, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block px-4 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-sm font-medium mb-6"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" 
            }}
          >
            Advanced Capabilities
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400">
              Intelligent Healthcare Solutions
            </span>
            <motion.span 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h2>
          <p className="text-xl text-gray-700 dark:text-yellow-300 max-w-2xl mx-auto">
            Our advanced AI algorithms optimize hospital operations and enhance patient care
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {advancedFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              custom={index}
              className={`bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative group`}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
                borderColor: `rgba(${feature.color === 'amber' ? '147, 51, 234' : feature.color === 'amber' ? '37, 99, 235' : feature.color === 'green' ? '16, 185, 129' : feature.color === 'red' ? '239, 68, 68' : feature.color === 'yellow' ? '245, 158, 11' : '79, 70, 229'}, 0.5)`
              }}
              onHoverStart={() => setActiveFeature(index)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              {/* Top color bar */}
              <div className={`h-2 w-full bg-${feature.color}-500`}></div>
              
              <div className="p-6">
                <div className={`p-4 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl inline-block mb-4 relative overflow-hidden group-hover:shadow-lg transition-all duration-300`}>
                  {/* Animated background for icon */}
                  <motion.div 
                    className={`absolute inset-0 bg-${feature.color}-200 dark:bg-${feature.color}-800 rounded-xl opacity-0 group-hover:opacity-30`}
                    animate={activeFeature === index ? {
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {feature.icon}
                </div>
                
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-${feature.color}-600 dark:group-hover:text-${feature.color}-400 transition-colors duration-300`}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                
                {/* Stats section that appears on hover */}
                <motion.div 
                  className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0,
                    height: activeFeature === index ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-${feature.color}-600 dark:text-${feature.color}-400 font-bold text-lg`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Learn more link */}
                <motion.div 
                  className={`mt-4 text-${feature.color}-600 dark:text-${feature.color}-400 font-medium flex items-center group/link`}
                  whileHover={{ x: 5 }}
                >
                  Learn more 
                  <FaArrowRight className="ml-2 transition-transform group-hover/link:translate-x-1" />
                </motion.div>
              </div>
              
              {/* Corner decoration */}
              <motion.div 
                className={`absolute -top-10 -right-10 w-20 h-20 bg-${feature.color}-500/10 rounded-full`}
                animate={activeFeature === index ? {
                  top: -30,
                  right: -30,
                  scale: 1.5,
                  opacity: 0.2
                } : {
                  top: -40,
                  right: -40,
                  scale: 1,
                  opacity: 0
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 inline-flex items-center relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <span className="relative z-10">Explore All Features</span>
            <motion.div
              className="relative z-10 ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <FaArrowRight />
            </motion.div>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white rounded-full opacity-30"
              whileHover={{
                width: 200,
                height: 200,
                opacity: 0,
                transition: { duration: 0.8 }
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedFeatures; 