import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCoffee, FaUtensils, FaCookieBite, FaPizzaSlice } from "react-icons/fa";

const icons = {
  breakfast: <FaCoffee className="inline mr-2 text-amber-500" />,
  lunch: <FaUtensils className="inline mr-2 text-emerald-500" />,
  snacks: <FaCookieBite className="inline mr-2 text-pink-500" />,
  dinner: <FaPizzaSlice className="inline mr-2 text-rose-500" />
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const Foodmenu = () => {
  const [messData, setMessData] = useState({});
  const [selectedMess, setSelectedMess] = useState("Mess1");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu`);
        setMessData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mess data:", error);
      }
    };
    fetchMessData();
  }, []);

  const messNames = Object.keys(messData);
  const currentMenu = messData[selectedMess]?.[selectedDay];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-800 text-2xl">
        Loading menu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-50 text-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-transparent bg-clip-text drop-shadow-xl"
          >
           Campus Mess Menu
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10 gap-6 flex-wrap"
        >
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold text-blue-600">Select Mess</label>
            <select
              className="text-lg p-3 rounded-xl shadow-xl bg-white text-gray-800 border-2 border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-400 hover:scale-105 transition-transform duration-200"
              onChange={(e) => setSelectedMess(e.target.value)}
              value={selectedMess}
            >
              {messNames.map((mess) => (
                <option key={mess} value={mess}>{mess}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold text-pink-600">Select Day</label>
            <select
              className="text-lg p-3 rounded-xl shadow-xl bg-white text-gray-800 border-2 border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 hover:scale-105 transition-transform duration-200"
              onChange={(e) => setSelectedDay(e.target.value)}
              value={selectedDay}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-10 rounded-3xl shadow-2xl ring-2 ring-blue-200 border border-blue-100"
        >
          {currentMenu ? (
            Object.entries(currentMenu).map(([meal, items]) => (
              <div key={meal} className="mb-10">
                <h2 className="text-2xl font-bold capitalize border-b-2 border-gray-300 pb-2 mb-4 flex items-center drop-shadow-md">
                  {icons[meal] || null}
                  {meal}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 text-lg">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-xl shadow-md hover:bg-yellow-100 hover:text-blue-900 transition-all font-medium"
                    >
                      🍴 {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-xl text-center text-gray-500">No data available for this day.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Foodmenu;
