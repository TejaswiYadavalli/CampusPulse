import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminExamSchedule() {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (branch && year && examType) {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/schedule?branch=${branch}&year=${year}&examType=${examType}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const fetchedExams = response.data[0]?.exams || [];
          if (fetchedExams.length > 0) {
            setExams(fetchedExams);
            setFetched(true);
          } else {
            setExams([{ subject: "", date: "" }]);
            setFetched(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching exam schedule:", error);
        });
    }
  }, [branch, year, examType]);

  const handleChange = (index, key, value) => {
    const updated = [...exams];
    updated[index][key] = value;
    setExams(updated);
  };

  const addExam = () => {
    setExams([...exams, { subject: "", date: "" }]);
  };

  const removeExam = (index) => {
    const updated = [...exams];
    updated.splice(index, 1);
    setExams(updated);
  };

  const handleSubmit = async () => {
    if (!branch || !year || !examType) {
      alert("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/schedule`, {
        branch,
        year,
        examType,
        exams,
      });

      setMessage(response.data.message);
      setShowSuccess(true);
      setExams([{ subject: "", date: "" }]);
    } catch (err) {
      setMessage("Failed to update schedule");
      setShowSuccess(true);
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl relative overflow-hidden">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        📝 Admin - Exam Schedule Manager
      </h2>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-200 border border-green-400 text-green-800 px-6 py-3 rounded-lg shadow-xl z-50"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="p-4 border-2 text-black border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white shadow-md transition ease-in-out"
        >
          <option value="">Select Branch</option>
          {["CSE", "ECE", "EEE", "MECH", "CHEM", "MME", "CIVIL"].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-4 border-2 text-black border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white shadow-md transition ease-in-out"
        >
          <option value="">Select Year</option>
          {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="p-4 border-2 text-black border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white shadow-md transition ease-in-out"
        >
          <option value="">Select Exam Type</option>
          <option value="Mid-1">Mid-1</option>
          <option value="Mid-2">Mid-2</option>
          <option value="Mid-3">Mid-3</option>
          <option value="Semester">Semester</option>
        </select>
      </div>

      {loading && (
        <div className="text-center text-white font-medium mb-4">
          <div className="loader"></div>
          <p>Loading schedule...</p>
        </div>
      )}

      {branch && year && examType && (
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {fetched ? "Update Existing Schedule" : "Create New Schedule"}
          </h3>

          {exams.map((exam, idx) => (
            <div key={idx} className="flex items-center gap-6 mb-4">
              <input
                type="text"
                value={exam.subject}
                onChange={(e) => handleChange(idx, "subject", e.target.value)}
                placeholder="Subject"
                className="p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm transition ease-in-out flex-1"
              />
              <input
                type="date"
                value={exam.date}
                onChange={(e) => handleChange(idx, "date", e.target.value)}
                className="p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm transition ease-in-out"
              />
              <button
                onClick={() => removeExam(idx)}
                className="text-red-600 font-semibold text-lg"
                disabled={exams.length === 1}
                title="Remove exam"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              onClick={addExam}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
            >
              ➕ Add Exam
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Saving..." : fetched ? "Update Schedule" : "Save Schedule"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
