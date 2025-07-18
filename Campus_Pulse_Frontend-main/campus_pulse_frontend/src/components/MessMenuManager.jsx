import React, { useEffect, useState } from "react";
import axios from "axios";
import EditableMealSection from "./EditableMealSection";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["breakfast", "lunch", "snacks", "dinner"];

const MessMenuManager = () => {
  const [menuData, setMenuData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMess, setSelectedMess] = useState("Mess1");
  const [messes, setMesses] = useState({});

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu`);
      const data = res.data || {};
      setMesses(data);
      if (data[selectedMess]) {
        setMenuData(data[selectedMess]);
      } else {
        setMenuData({});
      }
    } catch (err) {
      console.error("Error fetching mess menus:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [selectedMess]);

  const handleSave = async (day, meal, updatedItems) => {
    setLoading(true);
    console.log("Saving", { day, meal, updatedItems });

    const updatedMenu = {
      ...menuData,
      [day]: {
        ...menuData[day],
        [meal]: updatedItems,
      },
    };

    const updatedMesses = {
      ...messes,
      [selectedMess]: updatedMenu,
    };

    setMenuData(updatedMenu);
    setMesses(updatedMesses);

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/menu`, updatedMesses);

      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu`);
      setMesses(res.data || {});
      setMenuData(res.data[selectedMess] || {});

      setMessage("Menu updated successfully!");
    } catch (err) {
      console.error("Error updating menu:", err);
      setMessage("Error updating menu.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
      <h2 className="text-3xl font-semibold mb-6 text-blue-700 text-center transition-all duration-300">Mess Menu Editor</h2>

      {/* Dropdown to select mess */}
      <div className="mb-6 text-center">
        <label className="mr-4 text-lg text-black font-semibold">Select Mess: </label>
        <select
          value={selectedMess}
          onChange={(e) => setSelectedMess(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {Object.keys(messes).map((mess) => (
            <option key={mess} value={mess}>
              {mess}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <div className={`mb-4 text-lg font-semibold text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}

      {Object.keys(menuData).length === 0 ? (
        <p className="text-gray-500 text-center animate-pulse">Loading menu...</p>
      ) : (
        days.map((day) => (
          <div key={day} className="bg-white p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">{day}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <EditableMealSection
                  key={`${day}-${meal}`}
                  day={day}
                  meal={meal}
                  items={Array.isArray(menuData[day]?.[meal]) ? menuData[day][meal] : []}
                  onSave={handleSave}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl animate-pulse">Saving...</div>
        </div>
      )}
    </div>
  );
};

export default MessMenuManager;
