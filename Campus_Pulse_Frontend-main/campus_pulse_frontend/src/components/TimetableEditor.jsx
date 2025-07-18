import React, { useState } from 'react';
import axios from 'axios';

const TimetableEditor = () => {
  const [department, setDepartment] = useState('');
  const [classSection, setClassSection] = useState('');
  const [year, setYear] = useState('');
  const [timetableData, setTimetableData] = useState(null);
  const [editable, setEditable] = useState({});
  const [loading, setLoading] = useState(false);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EEE'];
  const classSections = ['A', 'B', 'C', 'D', 'E'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Concatenate department and classSection as department-class (e.g., CSE-A)
  const classFull = `${department}-${classSection}`;

  const fetchTimetable = async () => {
    if (!department || !classSection || !year) return;
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/faculty-timetable`, {
        params: {
          department,
          year,
          className: classFull, // Send the concatenated className
        },
      });
      setTimetableData(res.data);
      setEditable(res.data.timetable);
    } catch (err) {
      setTimetableData(null);
      console.error('Timetable fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (day, index, value) => {
    setEditable(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) => (i === index ? value : slot))
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/faculty-timetable/update`, {
        department,
        year,
        className: classFull, // Send the concatenated className
        timetable: editable
      });
      alert('Timetable updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update timetable');
    }
  };

  const handleLoadClick = () => {
    fetchTimetable();
  };

  return (
    <div className="p-6 bg-gray-50 shadow-xl rounded-xl max-w-screen-lg mx-auto mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">Faculty Timetable Editor</h1>

      {/* Dropdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={classSection}
          onChange={(e) => setClassSection(e.target.value)}
        >
          <option value="">Select Class</option>
          {classSections.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleLoadClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Load Timetable
        </button>
      </div>

      {/* Timetable Display */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : timetableData ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="border px-4 py-2">Time Slot</th>
                {Object.keys(editable).map(day => (
                  <th key={day} className="border px-4 py-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {editable.Monday.map((_, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-gray-800">Period {index + 1}</td> {/* Changed color for period text */}
                  {Object.keys(editable).map(day => (
                    <td key={day} className="border px-4 py-2">
                      <input
                        type="text"
                        value={editable[day][index] || ''}
                        onChange={(e) => handleChange(day, index, e.target.value)}
                        className="w-full p-1 border rounded focus:ring-2 focus:ring-indigo-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No timetable data found. Please load to edit.</p>
      )}
    </div>
  );
};

export default TimetableEditor;
