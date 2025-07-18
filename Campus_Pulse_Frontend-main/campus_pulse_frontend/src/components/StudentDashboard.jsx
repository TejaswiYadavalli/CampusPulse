import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserFriends,  FaCalendarAlt, FaUtensils, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import AnnouncementPopup from "./AnnouncementPopup";  // Ensure the import path is correct

const navOptions = [
  {
    title: "Clubs",
    icon: <FaUserFriends />,
    description: "Explore campus clubs and student communities.",
    color: "from-indigo-400 to-indigo-600",
    link: "/student/clubs",
  },
  {
    title: "Academic Calendar",
    icon: <FaCalendarAlt />,
    description: "Check Your Academic Calendar and important dates.",
    color: "from-green-400 to-green-600",
    link: "/student/calendar",
  },
  {
    title: "Exam Schedule",
    icon: <FaCalendarAlt />,
    description: "View upcoming exams and assessment timelines.",
    color: "from-yellow-400 to-yellow-500",
    link: "/student/examschedule",
  },
  {
    title: "Food Menu",
    icon: <FaUtensils />,
    description: "Check the daily and weekly food menu.",
    color: "from-red-400 to-red-600",
    link: "/student/foodmenu",
  },
  {
    title: "Timetable",
    icon: <FaClock />,
    description: "See your class and lab schedule by department.",
    color: "from-blue-400 to-blue-600",
    link: "/student/timetable",
  },
];

const StudentDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
        setAnnouncements(response.data);

        // Check if the popup has been shown already using sessionStorage
        const seen = sessionStorage.getItem("announcementSeen");
        if (!seen) {
          setShowPopup(true); // Show popup if not already seen
          sessionStorage.setItem("announcementSeen", "true"); // Mark as seen
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      <div className="flex flex-col items-center px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-6 text-center tracking-wide text-gray-800 drop-shadow-lg"
        >
          Campus Pulse Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg mb-12 text-center max-w-3xl"
        >
          Navigate your student life with ease. Stay informed, engaged, and connected.
        </motion.p>

        {loading ? (
          <p className="text-gray-700 text-lg mt-8">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {navOptions.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: [0, 1] }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white shadow-xl p-6 rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`bg-gradient-to-br ${option.color} p-4 rounded-full shadow-lg mb-4 w-fit`}
                >
                  <div className="text-white text-2xl">{option.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{option.title}</h3>
                <p className="text-gray-700">{option.description}</p>
                <Link to={option.link}>
                  <button className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition-all">
                    Explore {option.title}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center text-gray-600"
        >
          © {new Date().getFullYear()} Campus Pulse · Empowering Campus Life ✨
        </motion.div>
      </div>

      {/* Announcement Popup shown only once */}
      {showPopup && (
        <AnnouncementPopup
          announcements={announcements}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
