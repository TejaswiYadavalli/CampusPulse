import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnnouncementPopup = ({ announcements, onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white w-96 p-6 rounded-2xl shadow-xl relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-all duration-200"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                        🎙️Announcements
                    </h2>
                    {announcements.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No announcements available
                        </p>
                    ) : (
                        <ul className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                            {announcements.map((announcement) => (
                                <motion.li
                                    key={announcement._id}
                                    className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h3 className="text-lg text-blue-500 font-semibold">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-gray-700 mt-1">{announcement.content}</p>
                                    <span className="text-xs text-gray-500 block mt-2">
                                        Posted by: {announcement.postedBy}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnnouncementPopup;