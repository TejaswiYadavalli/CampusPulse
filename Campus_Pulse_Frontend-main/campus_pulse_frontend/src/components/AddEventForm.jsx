import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaListAlt, FaSchool } from 'react-icons/fa';
import axios from 'axios';

const AddEventForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { title, date, type, branch, year } = data;
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/academicCalendar`, {
        title,
        date,
        type,
        branch,
        year,
      });

      alert('Event Added Successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('There was an error adding the event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 transform transition-all"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-8 tracking-wide">Revise Academic Calendar</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Event Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <label htmlFor="title" className="text-lg font-medium text-gray-700">Event Title</label>
          <div className="flex items-center border-b-2 border-gray-300 py-3 mt-2">
            <FaListAlt className="text-gray-600 mr-4" />
            <input
              type="text"
              id="title"
              placeholder="Enter event title"
              {...register('title', { required: 'Event title is required' })}
              className="flex-1 bg-transparent text-lg outline-none text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
        </motion.div>

        {/* Event Date */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="date" className="text-lg font-medium text-gray-700">Event Date</label>
          <div className="flex items-center border-b-2 border-gray-300 py-3 mt-2">
            <FaCalendarAlt className="text-gray-600 mr-4" />
            <input
              type="datetime-local"
              id="date"
              {...register('date', { required: 'Event date is required' })}
              className="flex-1 bg-transparent text-lg outline-none text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>}
        </motion.div>

        {/* Event Type */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label htmlFor="type" className="text-lg font-medium text-gray-700">Event Type</label>
          <div className="flex items-center border-b-2 border-gray-300 py-3 mt-2">
            <FaUsers className="text-gray-600 mr-4" />
            <select
              id="type"
              {...register('type', { required: 'Event type is required' })}
              className="flex-1 bg-transparent text-lg outline-none text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="exam">Exam</option>
              <option value="holiday">Holiday</option>
              <option value="event">Event</option>
            </select>
          </div>
          {errors.type && <p className="text-red-500 text-sm mt-2">{errors.type.message}</p>}
        </motion.div>

        {/* Branch */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label htmlFor="branch" className="text-lg font-medium text-gray-700">Branch</label>
          <div className="flex items-center border-b-2 border-gray-300 py-3 mt-2">
            <FaSchool className="text-gray-600 mr-4" />
            <input
              type="text"
              id="branch"
              placeholder="Enter branch (e.g., CS, ME)"
              {...register('branch', { required: 'Branch is required' })}
              className="flex-1 bg-transparent text-lg outline-none text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.branch && <p className="text-red-500 text-sm mt-2">{errors.branch.message}</p>}
        </motion.div>

        {/* Year */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <label htmlFor="year" className="text-lg font-medium text-gray-700">Year</label>
          <div className="flex items-center border-b-2 border-gray-300 py-3 mt-2">
            <FaUsers className="text-gray-600 mr-4" />
            <input
              type="number"
              id="year"
              placeholder="Enter year (e.g., 2023)"
              {...register('year', { required: 'Year is required' })}
              className="flex-1 bg-transparent text-lg outline-none text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.year && <p className="text-red-500 text-sm mt-2">{errors.year.message}</p>}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button 
            type="submit" 
            className={`w-full py-3 bg-blue-600 text-white rounded-md text-lg transition-all duration-300 
              hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'cursor-wait' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding Event...' : 'Add Event'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AddEventForm;
