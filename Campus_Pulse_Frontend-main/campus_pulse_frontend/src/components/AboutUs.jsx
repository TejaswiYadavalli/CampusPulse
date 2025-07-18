import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const sections = [
  {
    title: "Our Vision",
    description:
      "Campus Pulse aims to centralize campus activities, from events and food menus to exam schedules. We’re here to modernize campus engagement for both students and faculty.",
    animationUrl: "https://lottie.host/a1df9170-786e-4fd6-8fe2-739696efde98/WBpgkfYXE3.lottie",
  },
  {
    title: "Why Campus Pulse?",
    description:
      "Whether it's tracking your timetable, checking today’s mess menu, or following your favorite clubs, Campus Pulse is designed to make your college life easier and smarter.",
    animationUrl: "https://lottie.host/744831cf-3993-47af-a23f-a0276647fd62/8CO1mZjXVp.json",
  },
  {
    title: "Made by Students, for Students",
    description:
      "We understand your needs because we are students too. Campus Pulse is built by engineering students who want to create impactful, user-centric tools for academic environments.",
    animationUrl: "https://lottie.host/5d694424-dfe9-4916-8673-bac1273d586f/P6h8E92KKI.lottie",
  },
  {
    title: "Seamless Integration",
    description:
      "Campus Pulse integrates all essential campus services into a unified platform, making it your go-to app for everything college-related.",
    animationUrl: "https://lottie.host/d3e7d295-75fb-4b2d-818f-f455aae7c024/FvAY0btWRm.lottie",
  },
  {
    title: "User-Centered Design",
    description:
      "Our design philosophy puts you first — simple, intuitive interfaces that empower you to access information effortlessly and stay connected.",
    animationUrl: "https://lottie.host/957f4056-ffc7-4dd0-b087-482b331edd6a/qVLEqtyknN.lottie",
  },
  {
    title: "Community & Support",
    description:
      "Campus Pulse fosters a vibrant campus community and offers dedicated support to ensure your experience is smooth and rewarding.",
    animationUrl: "https://lottie.host/85a399a7-9513-45c4-b337-63e108deec0b/pKe5qgvwt5.lottie",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-6 sm:px-14 lg:px-24">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl sm:text-6xl font-extrabold text-center text-blue-800 mb-20 tracking-wide drop-shadow-md"
      >
        About Campus Pulse
      </motion.h1>

      <motion.div
        className="space-y-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
            variants={fadeInUp}
          >
            {/* Clean Lottie - No Box, Shadow or Hover */}
            <div className="w-full md:w-1/2">
              <DotLottieReact
                src={section.animationUrl}
                loop
                autoplay
                style={{ width: "100%", maxHeight: "400px", background: "transparent" }}
              />
            </div>

            {/* Text content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.h2
                className="text-3xl font-semibold text-blue-900 mb-6 tracking-tight drop-shadow-sm"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.3 + 0.2,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              >
                {section.title}
              </motion.h2>
              <motion.p
                className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
              >
                {section.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-32 border-t border-blue-200 pt-12 text-center text-blue-700 italic select-none text-sm">
        &copy; {new Date().getFullYear()} Campus Pulse — Empowering Campus Life
      </div>
    </div>
  );
};

export default AboutUs;
