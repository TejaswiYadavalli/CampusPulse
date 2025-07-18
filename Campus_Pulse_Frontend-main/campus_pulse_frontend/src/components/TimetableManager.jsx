import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableForm from './TimetableForm';
import TimetableTable from './TimetableTable';

const TimetableManager = () => {
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedClass, setSelectedClass] = useState('CSE-A');
  const [selectedYear, setSelectedYear] = useState('1st Year'); 
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
`${process.env.REACT_APP_BACKEND_URL}/timetable/${selectedDept}/${selectedClass}/${selectedYear}`
        );
        setTimetable(response.data);
      } catch (err) {
        console.error('Error fetching timetable:', err);
      }
      setLoading(false);
    };

    fetchTimetable();
  }, [selectedDept, selectedClass, selectedYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-teal-200 to-yellow-100 p-6 text-gray-900">
      <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl sm:text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-900">
  Time table
</h1>


        <div className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-2xl backdrop-blur-md mb-6">
          <TimetableForm
            selectedDept={selectedDept}
            selectedClass={selectedClass}
            selectedYear={selectedYear} 
            setSelectedDept={setSelectedDept}
            setSelectedClass={setSelectedClass}
            setSelectedYear={setSelectedYear}
          />
        </div>

        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
          </div>
        ) : timetable ? (
          <div className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <TimetableTable timetable={timetable} />
          </div>
        ) : (
          <p className="text-center mt-10 text-red-400">No timetable found.</p>
        )}
      </div>
    </div>
  );
};

export default TimetableManager;
