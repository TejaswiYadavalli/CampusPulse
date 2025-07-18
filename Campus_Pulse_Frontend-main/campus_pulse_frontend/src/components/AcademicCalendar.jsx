import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, subMonths, addMonths } from 'date-fns';

const AcademicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [branch, setBranch] = useState('CSE');
  const [year, setYear] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowCalendar(false);
    setEvents([]);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/academicCalendar/${branch}/${year}`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();

      setEvents(data);
      setShowCalendar(true);
    } catch (error) {
      alert("Error fetching events. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center text-2xl font-bold text-indigo-700 mb-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-blue-500 hover:text-blue-600 transition-all duration-300">
        &lt;
      </button>
      <span>{format(currentMonth, 'MMMM yyyy')}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-blue-500 hover:text-blue-600 transition-all duration-300">
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 text-sm text-center text-gray-700 mb-2 font-semibold tracking-wide">
        {days.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const rows = [];

    let day = startDate;

    while (day <= monthEnd) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        const formatted = format(day, 'yyyy-MM-dd');
        const dayEvents = events.filter(e => format(new Date(e.date), 'yyyy-MM-dd') === formatted);
        const isSunday = day.getDay() === 0;

        days.push(
          <div key={day} className="p-2 sm:p-4 border border-gray-400 min-h-[90px] relative hover:bg-blue-100 hover:bg-opacity-20 transition-all duration-300 group rounded-md">
            <span className="text-sm font-bold text-blue-600">{format(day, 'd')}</span>

            {isSunday && (
              <div className="text-xs mt-1 px-2 py-1 rounded bg-red-500 text-white w-fit shadow-sm">
                Holiday
              </div>
            )}

            {dayEvents.map((event, idx) => (
              <div key={idx} className="relative group text-xs mt-1 w-full max-w-full">
                <div className={`px-2 py-1 rounded shadow-md truncate ${event.type === 'exam' ? 'bg-orange-500' : 'bg-green-500'} text-white`}>
                  {event.title.length > 10 ? event.title.slice(0, 10) + '…' : event.title}
                </div>
                <div className="absolute z-20 bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max max-w-xs text-center pointer-events-none">
                  {event.title}
                </div>
              </div>
            ))}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(<div key={day} className="grid grid-cols-7 gap-px">{days}</div>);
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 text-black">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-900">
  Academic Calendar
</h1>

        <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg backdrop-blur-lg mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-full sm:w-48">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Branch</label>
              <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full p-3 rounded-lg text-white focus:ring-2 focus:ring-cyan-400">
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="CHEM">CHEM</option>
                <option value="MME">MME</option>
              </select>
            </div>

            <div className="w-full sm:w-48">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Year</label>
              <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="w-full p-3 rounded-lg text-white focus:ring-2 focus:ring-cyan-400">
                {[1, 2, 3, 4].map((yr) => (
                  <option key={yr} value={yr}>{yr} Year</option>
                ))}
              </select>
            </div>

            <button type="submit" className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
              {loading ? "Loading..." : "Show Calendar"}
            </button>
          </div>
        </form>

        {showCalendar && (
          <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        )}

        {showCalendar && events.length === 0 && !loading && (
          <div className="text-center text-red-500 mt-6 font-semibold">No events found for this selection.</div>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendar;
