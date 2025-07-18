import React, { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaUserCheck } from "react-icons/fa";
import axios from "axios";

const StatsCards = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalFaculty: 0,
    registeredFaculty: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/stats`, { withCredentials: true });
        setStatsData(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: statsData.totalUsers,
      icon: <FaUsers className="text-4xl text-green-500" />,
    },
    {
      title: "Total Faculty",
      value: statsData.totalFaculty,
      icon: <FaChalkboardTeacher className="text-4xl text-blue-500" />,
    },
    {
      title: "Registered Faculty",
      value: statsData.registeredFaculty,
      icon: <FaUserCheck className="text-4xl text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-4 bg-blue-100 rounded-full mb-2">{stat.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
