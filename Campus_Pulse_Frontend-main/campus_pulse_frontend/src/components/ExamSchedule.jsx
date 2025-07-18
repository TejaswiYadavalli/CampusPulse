import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./Card";
import { Select, SelectItem } from "./Select";
import axios from "axios"; // Import axios for API calls

// const CLIENT_ID = "938531488618-qt5j75gjqc0h29gaecnuqmif3v43f5m1.apps.googleusercontent.com";
// const API_KEY = "AIzaSyDD6722h6lrebOc-uSuTlonAWPo5HJQVqI";
// const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export default function ExamSchedule() {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("");
  const [examData, setExamData] = useState([]); // State for exam data

  const [showCalendar, setShowCalendar] = useState(false);

  // Fetch exam schedule when branch, year, or examType changes
  useEffect(() => {
    if (branch && year && examType) {
      // Replace with your actual backend API URL
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/schedule?branch=${branch}&year=${year}&examType=${examType}`;

      // Fetch the exam data
      axios.get(apiUrl)
        .then((response) => {
          setExamData(response.data[0].exams || []);
          console.log("exam schedule", response.data[0].exams); // Assuming the response contains an array of exams
        })
        .catch((error) => {
          console.error("Error fetching exam data:", error);
        });
    }
  }, [branch, year, examType]);

  return (
    <div
      className="flex bg-gradient-to-r from-blue-500 to-teal-500 flex-col items-center justify-center min-h-screen text-white p-6"
    >
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text 
             bg-gradient-to-r from-white to-gray-300 drop-shadow-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Exam Schedule
      </motion.h1>

      {/* Select Dropdowns */}
      <div className="flex flex-wrap gap-4 mb-8 max-w-4xl w-full justify-center">
        {/* Branch Select */}
        <Select value={branch} onChange={setBranch} placeholder="Select Branch" className="w-52">
          {["CSE", "ECE", "EEE", "MECH", "CHEM", "MME", "CIVIL"].map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}
        </Select>

        {/* Year Select */}
        <Select
          value={year}
          onChange={setYear}
          placeholder="Select Year"
          disabled={!branch}
          className="w-52"
        >
          {branch &&
            ["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
        </Select>

        {/* Exam Type Select */}
        <Select
          value={examType}
          onChange={setExamType}
          placeholder="Select Exam"
          disabled={!year}
          className="w-52"
        >
          <SelectItem value="Mid-1">Mid-1</SelectItem>
          <SelectItem value="Mid-2">Mid-2</SelectItem>
          <SelectItem value="Mid-3">Mid-3</SelectItem>
          <SelectItem value="Semester">Semester</SelectItem>
        </Select>
      </div>

      {/* Display Exam Schedule */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full flex flex-col items-center"
      >
        {examData.length > 0 ? (
          examData.map((exam, index) => (
            <Card key={index} className="mb-4 w-full max-w-md">
              <CardContent title={exam.subject} date={exam.date} />
            </Card>
          ))
        ) : (
          <p className="font-medium text-xl text-center">
            Select a Branch, Year & Exam Type to view the schedule.
          </p>
        )}
      </motion.div>

      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {showCalendar ? "Hide Calendar" : "View Calendar"}
      </button>

      {/* Google Calendar Embed (Visible when button is clicked) */}
      {showCalendar && (
        <div className="mt-6 w-full flex justify-center">
          <iframe
            title="calendar"
            src="https://calendar.google.com/calendar/embed?src=2a79a6581537d55aba7f0b0c6a3417b74730a7e36055ed90d1ab28011df53489%40group.calendar.google.com&ctz=UTC"
            style={{ border: "0" }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
            className="shadow-lg rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
}
