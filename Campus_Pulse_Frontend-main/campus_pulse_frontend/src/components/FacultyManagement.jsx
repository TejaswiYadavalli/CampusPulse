import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/faculties`) // use your actual API route
      .then((res) => {
        setFaculty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching faculty:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl mb-6 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">Faculty Directory</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading faculty...</p>
      ) : faculty.length === 0 ? (
        <p className="text-center text-gray-500">No faculty found.</p>
      ) : (
        faculty.map((fac, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-3 transition-transform hover:scale-[1.01]"
          >
            <div>
              <p className="font-medium text-gray-800">{fac.name}</p>
              <p className="text-sm text-gray-500">Faculty ID: {fac.facultyId}</p>
            </div>
            <span className="text-sm text-gray-500 capitalize">
              {fac.isRegistered ? "Registered" : "Not Registered"}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default FacultyManagement;
