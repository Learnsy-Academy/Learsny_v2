import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Linkedin, Sparkles, GraduationCap, BookOpen, Award, CheckCircle2, Zap, Rocket } from "lucide-react";
import { createClient } from "@supabase/supabase-js";


const PARTICLES = Array.from({ length: 30 }, (_, i) => i);


const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/learnsy-academy/posts/?feedView=all", label: "LinkedIn" },
  // { icon: Instagram, href: "#", label: "Instagram" },
];


const FLOATING_ICONS = [
  { icon: Sparkles, x: "8%", y: "15%", duration: 20 },
  { icon: BookOpen, x: "88%", y: "20%", duration: 18 },
  { icon: Award, x: "10%", y: "80%", duration: 22 },
  { icon: GraduationCap, x: "85%", y: "75%", duration: 19 },
];


// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }


    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }


    setIsLoading(true);
    try {
      // Insert email into Supabase
      const { data, error: supabaseError } = await supabase
        .from("subscribers")
        .insert([
          {
            email: email.toLowerCase(),
            subscribed_at: new Date().toISOString(),
          },
        ]);


      if (supabaseError) {
        // Check if email already exists
        if (supabaseError.code === "23505") {
          setError("This email is already subscribed!");
        } else {
          setError("Failed to subscribe. Please try again.");
          console.error("Supabase error:", supabaseError);
        }
        setIsLoading(false);
        return;
      }


      // Show success message
      setSubmitted(true);
      setEmail("");


      // Reset success message after 50 seconds
      setTimeout(() => setSubmitted(false), 50000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-white">
      {/* Subtle golden gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(245, 184, 0, 0.03) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(255, 193, 7, 0.02) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* Floating Golden Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F5B800] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>


      {/* Floating Education Icons */}
      {FLOATING_ICONS.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 5, -5, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.icon
            className="w-16 h-16 lg:w-20 lg:h-20 text-[#F5B800]"
            strokeWidth={1}
          />
        </motion.div>
      ))}


      {/* Main Content Container - Optimized for all screens */}
      <div className="relative z-10 w-full max-w-2xl sm:max-w-2xl md:max-w-xl lg:max-w-3xl mx-auto px-2 sm:px-4 md:px-3 py-4 sm:py-6 md:py-4 lg:py-12">
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-6">
          {/* Logo - Responsive Size */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="flex justify-center -mt-10 sm:-mt-12 md:-mt-8 lg:-mt-30 -mb-2 sm:-mb-3 md:-mb-2 lg:-mb-6"
          >
            <div className="relative inline-block">
              <img
                src="/_Learnsy.png"
                alt="Learr Academy Logo"
                className="w-24 sm:w-28 md:w-28 lg:w-40 h-24 sm:h-28 md:h-28 lg:h-40 object-contain"
              />
            </div>
          </motion.div>


          {/* Main Heading - Responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-0 -mt-1 sm:-mt-2 md:-mt-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-2xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight"
            >
              <span className="block text-black">Get Notified When</span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#F5B800] via-[#FFC107] to-[#FFD54F] bg-clip-text text-transparent">
                We&apos;re Launching!
                </span>
              </span>
            </motion.h1>
          </motion.div>


          {/* Subtitle - Responsive */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xs sm:text-xs md:text-xs lg:text-lg max-w-md sm:max-w-md md:max-w-sm lg:max-w-xl mx-auto font-light leading-relaxed -mt-1 sm:-mt-1 md:-mt-1 lg:-mt-4 px-1 sm:px-2 md:px-1"
          >
            Receive Exclusive Launch Updates and Notifications
          </motion.p>


          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-sm sm:max-w-sm md:max-w-xs lg:max-w-xl mx-auto mt-2 sm:mt-4 md:mt-2 lg:mt-8"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="relative space-y-2"
                >
                  <div className="relative flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-1 lg:gap-3 bg-gray-50 rounded-lg sm:rounded-xl md:rounded-lg lg:rounded-xl p-1 border-2 border-gray-200 shadow-lg">
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="flex-1 bg-white border-0 text-black placeholder:text-gray-400 h-9 sm:h-10 md:h-10 lg:h-12 px-2 sm:px-4 md:px-3 lg:px-5 text-xs sm:text-xs md:text-xs lg:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B800] focus:ring-offset-0 transition-all"
                      required
                    />
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.03 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className="relative h-9 sm:h-10 md:h-10 lg:h-12 px-3 sm:px-6 md:px-4 lg:px-8 rounded-lg bg-gradient-to-r from-[#F5B800] via-[#FFC107] to-[#FFD54F] hover:from-[#FFC107] hover:via-[#FFD54F] hover:to-[#F5B800] text-black font-bold text-xs sm:text-xs md:text-xs lg:text-base shadow-lg shadow-[#F5B800]/40 hover:shadow-xl hover:shadow-[#F5B800]/60 transition-all duration-300 border-0 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-black/80 border-t-transparent rounded-full relative z-10"
                        />
                      ) : (
                        <span className="relative z-10">Notify me</span>
                      )}
                    </motion.button>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm font-medium px-4"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg sm:rounded-xl md:rounded-lg lg:rounded-xl p-4 sm:p-6 md:p-4 lg:p-6 shadow-xl max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-sm mx-auto py-2 sm:py-3 md:py-2 lg:py-3"
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-2 lg:gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="bg-green-500 p-2 sm:p-3 md:p-2 lg:p-3 rounded-full"
                    >
                      <CheckCircle2 className="w-6 sm:w-8 md:w-6 lg:w-8 h-6 sm:h-8 md:h-6 lg:h-8 text-white" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-black text-base sm:text-xl md:text-base lg:text-xl font-bold mb-0.5 sm:mb-1 md:mb-0.5">
                        You&apos;re on the list!
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-xs lg:text-sm">
                        We&apos;ll notify you as soon as we launch
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>


          {/* Social Links - Only show after submission */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="pt-1 sm:pt-2 md:pt-1 lg:pt-2"
              >
                <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-3 lg:gap-4 flex-wrap">
                  <span className="text-gray-600 text-xs sm:text-sm md:text-xs lg:text-base font-semibold">Follow us on</span>
                  {SOCIAL_LINKS.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -5,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-[#F5B800] to-[#FFC107] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      <div className="relative w-9 sm:w-11 md:w-9 lg:w-11 h-9 sm:h-11 md:h-9 lg:h-11 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200 group-hover:bg-white group-hover:border-[#F5B800] transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <social.icon className="w-4 sm:w-5 md:w-4 lg:w-5 h-4 sm:h-5 md:h-4 lg:h-5 text-gray-600 group-hover:text-[#F5B800] transition-colors" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Enhanced Coming Soon Badge - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="pt-2 sm:pt-3 md:pt-2 lg:pt-4"
          >
            <div className="relative inline-block">
              {/* Animated background circles */}
              <motion.div
                className="absolute -inset-4 bg-[#F5B800] rounded-full blur-2xl opacity-10"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />


              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative bg-gradient-to-r from-white via-gray-50 to-white px-3 sm:px-4 md:px-3 lg:px-8 py-1.5 sm:py-2 md:py-1.5 lg:py-4 rounded-full border-2 border-[#F5B800]/50 shadow-2xl overflow-hidden"
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5B800]/20 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />


                <div className="relative flex items-center gap-1.5 sm:gap-2 md:gap-1.5 lg:gap-3 justify-center flex-wrap">
                  {/* Rotating sparkles - Responsive */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles
                      className="w-3 sm:w-3 md:w-3 lg:w-5 h-3 sm:h-3 md:h-3 lg:h-5 text-[#F5B800]"
                      fill="#F5B800"
                    />
                  </motion.div>


                  <motion.div
                    className="flex items-center gap-1.5 sm:gap-2"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-black font-bold text-xs sm:text-xs md:text-xs lg:text-base bg-gradient-to-r from-black via-black-100 to-black bg-clip-text text-transparent">
                      Something Amazing Is Coming Soon
                    </span>
                  </motion.div>


                  <motion.div
                    animate={{
                      rotate: [360, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <Sparkles
                      className="w-3 sm:w-3 md:w-3 lg:w-5 h-3 sm:h-3 md:h-3 lg:h-5 text-[#F5B800]"
                      fill="#F5B800"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
