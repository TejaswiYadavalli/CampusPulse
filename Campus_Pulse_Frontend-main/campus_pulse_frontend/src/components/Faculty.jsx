import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaBullhorn,
  FaClock,
  FaUsers,
  FaBookOpen,
  FaUtensils,
  FaCalendarAlt
} from "react-icons/fa";
import PostAnnouncementModal from "./PostAnnouncementModal";
import CameraForm from "./CameraForm";
const facultyOptions = [
  {
    title: "Post Announcement",
    icon: FaBullhorn,
    description: "Keep students and staff updated with the latest info.",
    bg: "from-amber-500 to-orange-600"
  },
  {
    title: "Edit Timetable",
    icon: FaClock,
    description: "Manage class schedules for your department.",
    bg: "from-indigo-500 to-purple-600",
    link: "/faculty/edit-timetable"
  },
  {
    title: "View Food Menu",
    icon: FaUtensils,
    description: "Check the daily mess menu and weekly meal plans.",
    bg: "from-lime-500 to-green-600",
    link: "/faculty/foodmenu"
  },
  {
    title: "View Academic Calendar",
    icon: FaBookOpen,
    description: "Stay updated with important academic events and holidays.",
    bg: "from-sky-500 to-blue-600",
    link: "/faculty/calendar"
  },
  {
    title: "Scan Student & Get Details",
    icon: FaUsers,
    description: "Scan student face and retrieve academic and personal information.",
    bg: "from-rose-500 to-pink-600"
  }
];


const Faculty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraFormOpen, setIsCameraFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (title, link) => {
    if (title === "Post Announcement") {
      setIsModalOpen(true);
    } else if (title === "Scan Student & Get Details") {
      setIsCameraFormOpen(true);
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Faculty Dashboard
          </h1>
          <p className="mt-3 text-gray-300 text-lg">
            Manage academic and collaboration tools at one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`bg-gradient-to-br ${option.bg} rounded-2xl p-6 shadow-lg backdrop-blur-lg hover:shadow-white/30 transform transition duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <Icon className="text-gray-800 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{option.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{option.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCardClick(option.title, option.link)}
                  className="mt-6 w-full bg-white/20 text-white py-2 rounded-lg hover:bg-white/30 transition-all duration-300 font-medium"
                >
                  Go to {option.title}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block bg-white/10 border border-white/20 px-8 py-4 rounded-2xl backdrop-blur-md text-white text-lg font-semibold shadow-lg hover:shadow-white/20 transition-all"
          >
            <FaChalkboardTeacher className="inline mr-2 text-yellow-300 text-2xl" />
            Welcome, Faculty! Let’s make learning better together.
          </motion.div>
        </div>
      </motion.div>

      {/* 📢 Post Announcement Modal */}
      <PostAnnouncementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 📸 Camera Form Modal */}
      {isCameraFormOpen && (
        <CameraForm onClose={() => setIsCameraFormOpen(false)} />
      )}
    </div>
  );
};

export default Faculty;
