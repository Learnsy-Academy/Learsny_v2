import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Clock,
  Calendar,
  Gift,
  Users,
  Rocket,
  Sparkles,
  GraduationCap,
  BookOpen,
  Award
} from "lucide-react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => i);

const FLOATING_ICONS = [
  { icon: Sparkles, x: "8%", y: "15%", duration: 20 },
  { icon: BookOpen, x: "88%", y: "20%", duration: 18 },
  { icon: Award, x: "10%", y: "80%", duration: 22 },
  { icon: GraduationCap, x: "85%", y: "75%", duration: 19 },
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date("2026-01-21T16:00:00+01:00"); // 4:00 PM BST
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          <motion.div 
            className="absolute inset-0 blur-xl opacity-30 rounded-2xl"
            style={{ background: '#F5B800' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="relative bg-white rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[100px] shadow-2xl"
            style={{ borderWidth: '3px', borderColor: '#F5B800' }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              key={item.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl md:text-5xl font-black"
              style={{ color: '#F5B800' }}
            >
              {String(item.value).padStart(2, "0")}
            </motion.div>
            <div className="text-xs md:text-sm text-gray-600 mt-2 uppercase tracking-wider font-bold">
              {item.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const EventPathItem = ({ icon: Icon, title, description, delay, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative flex gap-6 group"
  >
    {/* Connector Line */}
    {!isLast && (
      <motion.div 
        className="absolute left-6 top-16 w-0.5 h-full"
        style={{ background: '#F5B800' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      />
    )}
    
    {/* Icon Circle */}
    <div className="relative z-10 flex-shrink-0">
      <motion.div
        whileHover={{ scale: 1.15, rotate: 360 }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: '#F5B800' }}
        animate={{ 
          boxShadow: [
            '0 10px 30px rgba(245, 184, 0, 0.3)',
            '0 10px 40px rgba(245, 184, 0, 0.5)',
            '0 10px 30px rgba(245, 184, 0, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
    </div>
    
    {/* Content */}
    <div className="flex-1 pb-12">
      <h3 className="text-gray-900 font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const [isRegistered, setIsRegistered] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterClick = () => {
    window.open("https://luma.com/bl9cnl8l?fbclid=PAb21jcAO8jOpleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadfxypcJG_JbHAX8sJnPP6eXE-aNzwTy0YfVcooU9M9oUxdkTYhDRyGDnjHXg_aem_mZq5m7HGOXkmV-dofZgteg&tk=kFR1Pk&utm_content=link_in_bio&utm_medium=social&utm_source=ig", "_blank");
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* BACKGROUND ANIMATIONS START */}
      
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

      {/* BACKGROUND ANIMATIONS END */}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-12 px-6"
        >
          <div className="max-w-6xl mx-auto flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1
              }}
              transition={{ 
                duration: 0.6,
                delay: 0.2
              }}
            >
              <img
                src="/_Learnsy.png"
                alt="Learnsy Academy"
                className="h-16 md:h-24 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <main className="px-6 pt-16 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-gray-900">We're launching on </span>
                <span 
                  style={{ color: '#F5B800' }}
                >
                  21st Jan 2026
                </span>
              </motion.h1>
              <motion.div 
                className="flex flex-col items-center gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div 
                  className="flex items-center gap-2 text-xl md:text-2xl"
                  style={{ color: '#F5B800' }}
                >
                  <Clock className="w-6 h-6" />
                  <span className="font-bold">4:00 PM BST</span>
                </div>
                <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
                  Register here to join us for the event
                </p>
              </motion.div>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <CountdownTimer />
            </motion.div>

            {/* Register Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-md mx-auto mb-20"
            >
              <AnimatePresence mode="wait">
                {!isRegistered ? (
                  <motion.div
                    key="button"
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center"
                  >
                    <motion.button
                      onClick={handleRegisterClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white font-bold text-base md:text-lg h-14 px-16 rounded-full transition-all duration-300 shadow-xl"
                      style={{ 
                        background: '#F5B800',
                        boxShadow: '0 8px 30px rgba(245, 184, 0, 0.4)'
                      }}
                    >
                      Register Now
                    </motion.button>
                    <p className="text-center text-gray-500 text-sm mt-4">
                      Secure your spot for the launch event
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        rotate: { duration: 0.5 }
                      }}
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                      style={{ 
                        background: '#F5B800',
                        boxShadow: '0 20px 50px rgba(245, 184, 0, 0.5)'
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">You're Registered!</h3>
                    <p className="text-gray-600">
                      We'll see you at the launch event on January 21st, 2026!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Event Journey Path */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="max-w-3xl mx-auto mb-20"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <motion.span 
                  style={{ color: '#F5B800' }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  What to Expect
                </motion.span>
              </motion.h2>
              <div className="space-y-0">
                <EventPathItem
                  icon={Rocket}
                  title="Official Launch Announcement"
                  description="Be part of the moment when we unveil Learnsy Academy to the world. Exclusive first look at our platform and features."
                  delay={1.1}
                  isLast={false}
                />
                <EventPathItem
                  icon={Gift}
                  title="Special Launch Offers"
                  description="Early registrants will receive exclusive benefits, founding member perks, and limited-time discounts."
                  delay={1.2}
                  isLast={false}
                />
                <EventPathItem
                  icon={Users}
                  title="Meet the Team & Community"
                  description="Connect with our instructors, meet fellow learners, and become part of a vibrant learning community."
                  delay={1.3}
                  isLast={false}
                />
                <EventPathItem
                  icon={Calendar}
                  title="Early Access"
                  description="Registered attendees get immediate early access to our first courses and premium content."
                  delay={1.4}
                  isLast={true}
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
