import React from 'react';

const TimetableTable = ({ timetable }) => {
  // Define fixed time slots based on index
  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "1:00 - 2:00",
    "2:00 - 3:00",
    "3:00 - 4:00",
  ];

  return (
    <div className="overflow-x-auto mt-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-8 rounded-xl shadow-lg">
      <table className="min-w-full table-auto text-white">
        <thead>
          <tr className="bg-blue-800">
            <th className="px-6 py-3 text-center text-lg font-bold uppercase border-b-2 border-white">Day</th>
            {timeSlots.map((slot, index) => (
              <th key={index} className="px-6 py-3 text-center text-lg font-bold uppercase border-b-2 border-white">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
            <tr 
              key={index} 
              className={`${
                index % 2 === 0 ? 'bg-blue-700' : 'bg-blue-600'
              } hover:bg-blue-500 hover:scale-105 transition-transform duration-300 ease-in-out`}
            >
              <td className="px-6 py-3 text-center font-semibold border-b border-blue-400">{day}</td>
              {timeSlots.map((_, idx) => (
                <td 
                  key={idx} 
                  className="px-6 py-3 text-center border-b border-blue-400"
                >
                  {timetable[day]?.[idx] || 'No Class'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableTable;
