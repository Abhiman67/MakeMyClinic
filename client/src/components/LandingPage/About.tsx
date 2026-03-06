import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaEye, FaUsers, FaPhoneAlt, FaHospital, FaAward, FaHandshake, FaArrowRight } from 'react-icons/fa';
import { useAnimation as useAnimationContext } from './AnimationContext';

const AboutUsSection = () => {
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

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "500+", label: "Hospitals" },
    { value: "50M+", label: "Patients Served" },
    { value: "99.9%", label: "Uptime" }
  ];


  return (
    <section className="py-24 relative overflow-hidden" id="about" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply opacity-10 blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply opacity-10 blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
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
        {[FaHospital, FaAward, FaHandshake].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500/10 dark:text-yellow-300/10"
            style={{
              top: `${15 + i * 30}%`,
              right: `${5 + i * 25}%`,
              fontSize: `${4 + i}rem`
            }}
            animate={{
              y: [0, -15, 0, 15, 0],
              rotate: [0, 5, 0, -5, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 8 + i * 2,
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
            Our Story
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400">
              About Make My Clinic
            </span>
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-yellow-200 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are dedicated to transforming healthcare by providing innovative solutions for hospitals.
            Our technology streamlines patient management, improves operational efficiency, and enhances
            the overall patient experience. Our mission is to leverage advanced technology to support
            healthcare professionals and ensure the best care for patients.
          </motion.p>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-yellow-100 dark:border-yellow-800/50 relative overflow-hidden group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)"
              }}
            >
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-500/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2"
                animate={{
                  textShadow: [
                    "0 0 0 rgba(99, 102, 241, 0)",
                    "0 0 10px rgba(99, 102, 241, 0.3)",
                    "0 0 0 rgba(99, 102, 241, 0)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between items-stretch space-y-8 lg:space-y-0 lg:space-x-8 mb-20">
          {/* Our Vision */}
          <motion.div
            className="bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl p-8 lg:w-1/3 text-left relative overflow-hidden group"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8 }
              }
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
              borderColor: "rgba(99, 102, 241, 0.5)"
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative z-10">
              <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl inline-block mb-6">
                <FaEye className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be at the forefront of healthcare innovation, delivering solutions that create a seamless and efficient experience for hospitals and patients alike. We aim to redefine the standards of patient care through technology and innovation.
              </p>
              <motion.div
                className="w-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mt-6 group-hover:w-full transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            className="bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl p-8 lg:w-1/3 text-left relative overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 }
              }
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
              borderColor: "rgba(99, 102, 241, 0.5)"
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative z-10">
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl inline-block mb-6">
                <FaUsers className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our team consists of experienced professionals with a passion for improving healthcare systems. We work collaboratively to develop and implement solutions that meet the needs of modern healthcare facilities.
              </p>
              <motion.div
                className="w-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mt-6 group-hover:w-full transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            className="bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl p-8 lg:w-1/3 text-left relative overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.4 }
              }
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
              borderColor: "rgba(99, 102, 241, 0.5)"
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-pink-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative z-10">
              <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl inline-block mb-6">
                <FaPhoneAlt className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Have any questions or want to learn more about our solutions? Reach out to us, and we'll be happy to provide more information and assist with your needs.
              </p>
              <motion.button
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-pink-600 text-white font-medium inline-flex items-center group/btn relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get in Touch</span>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
