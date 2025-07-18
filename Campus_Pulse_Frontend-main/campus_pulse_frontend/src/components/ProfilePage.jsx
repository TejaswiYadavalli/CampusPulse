import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center mt-10 text-red-500">Failed to load profile.</div>;
  }

  const { firstName, lastName, email, photoUrl } = userData;
  const profileInitial = firstName?.[0]?.toUpperCase() || "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 to-blue-100 p-6"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center"
      >
        {photoUrl ? (
          <motion.img
            src={photoUrl}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg border-4 border-white"
            whileHover={{ scale: 1.05 }}
          />
        ) : (
          <motion.div
            className="w-24 h-24 mx-auto flex items-center justify-center bg-blue-600 text-white text-3xl font-bold rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {profileInitial}
          </motion.div>
        )}

        <motion.h1
          className="text-2xl font-semibold mt-6 text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {firstName} {lastName}
        </motion.h1>
        <motion.p
          className="text-gray-500 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {email}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;