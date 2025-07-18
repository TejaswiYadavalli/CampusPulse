import React from 'react';

const departments = ['CSE', 'ECE', 'EEE', 'ME', 'CE'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const TimetableForm = ({ selectedDept, selectedClass, selectedYear, setSelectedDept, setSelectedClass, setSelectedYear }) => {
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Select Department, Year & Class</h2>

      <form className="space-y-6">
        {/* Department Selection */}
        <div>
          <label htmlFor="department" className="block text-sm font-semibold text-black">Department</label>
          <select
            id="department"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full p-3 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Year Selection */}
        <div>
          <label htmlFor="year" className="block text-sm font-semibold text-black">Year</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full text-white p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Class Selection */}
        <div>
          <label htmlFor="class" className="block text-sm font-semibold text-black">Class</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full text-white p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {/* Render classes dynamically based on selected department */}
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={`${selectedDept}-${String.fromCharCode(65 + i)}`}>
                {selectedDept}-{String.fromCharCode(65 + i)}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Fetch Timetable
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
