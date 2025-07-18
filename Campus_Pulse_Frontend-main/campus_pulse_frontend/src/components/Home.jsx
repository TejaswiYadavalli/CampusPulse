import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  FaCalendarAlt,
  FaBullhorn,
  FaClipboardList,
  FaUserShield,
  FaUsers,
  FaBell,
  FaRocket,
  FaHandshake,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";
import LoginNavbar from "./LoginNavbar";
import Footer from "./Footer";
import EventsSection from "./EventsSection";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-900 min-h-screen font-sans overflow-x-hidden">
      <LoginNavbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <CarouselSection />
      </motion.div>
      <FeaturesSection />
      <EventsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

// 🎠 Carousel Section (Responsive Images)
function CarouselSection() {
  const desktopSlides = ["/c1.gif", "/c2.png", "/c3.png"];
  const mobileSlides = ["/m1.gif", "/m2.png", "/m3.png"];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  return (
    <div className="relative z-0 mt-2">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        transitionTime={1000}
        className="rounded-xl overflow-hidden shadow-xl"
      >
        {slides.map((image, index) => (
          <div key={index} className="relative w-full h-[85vh]">
            <motion.img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

// 🧩 Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <FaClipboardList />,
      color: "text-blue-500",
      title: "Smart Timetables",
      desc: "Access real-time class schedules based on your department and year.",
    },
    {
      icon: <FaBullhorn />,
      color: "text-green-500",
      title: "Live Announcements",
      desc: "Stay instantly updated with campus-wide announcements and faculty posts.",
    },
    {
      icon: <FaCalendarAlt />,
      color: "text-red-500",
      title: "Event Management",
      desc: "Get the latest updates on campus events and activities.",
    },
    {
      icon: <FaUserShield />,
      color: "text-purple-500",
      title: "Role-Based Dashboards",
      desc: "Tailored experiences for Admins, Faculty, Students, and Managers.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-white via-gray-50 to-purple-100 text-center relative overflow-hidden">
      <motion.h2
        className="text-4xl font-extrabold mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Amazing Features
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto z-10 relative">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 hover:shadow-blue-200 transition-all duration-500"
            whileHover={{ scale: 1.06, rotate: 1 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className={`${feature.color} text-4xl mb-4 animate-pulse`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// 🌟 Testimonials Section with Lottie Animation
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Ratna Kumari Challa Mam",
      role: "HOD - Dept. of CSE",
      text: "This platform makes the students to get all updates efficiently. It's structured and easy to use!",
    },
    {
      name: "Asst.Prof Mahendra Sir",
      role: "IT Infra Head",
      text: "Finally, a way to interact with students seamlessly. This is the future of education.",
    },
    {
      name: "Naga Pavan",
      role: "Student",
      text: "Connecting with Friends and getting all latest updates quickly!",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <div className="w-full text-center lg:text-left">
          <motion.h2
            className="text-4xl font-extrabold mb-10 text-gray-900"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 hover:shadow-blue-200 transition-all hover:-translate-y-2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="italic text-gray-700 mb-4 text-lg">
                  “{testimonial.text}”
                </p>
                <h3 className="text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🎞 Lottie Animation */}
        <div className="w-full max-w-md">
          <DotLottieReact
            src="https://lottie.host/2f5c6b86-c362-419e-a60c-82d11c57d1d8/KatBHzWIU9.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
