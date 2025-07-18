import React, { useState } from "react";
import axios from "axios";

const AddFacultyForm = () => {
  const [faculty, setFaculty] = useState({
    name: "",
    facultyId: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting faculty:", faculty); 
  
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/faculties`,
        faculty,
        { withCredentials: true } 
      );
      setMessage("Faculty added successfully!");
      setFaculty({ name: "", facultyId: "" });
    } catch (error) {
      setMessage("Error adding faculty.");
      console.error("AXIOS ERROR:", error.response?.data || error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-2xl font-bold mb-4 text-blue-700 text-center">Add New Faculty</h3>
      
      {message && (
        <p className={`mb-4 text-center font-medium ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Faculty Name"
          name="name"
          value={faculty.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Faculty ID"
          name="facultyId"
          value={faculty.facultyId}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 transition"
          disabled={loading} 
        >
          {loading ? "Adding..." : "Add Faculty"}
        </button>
      </form>
    </div>
  );
};

export default AddFacultyForm;
