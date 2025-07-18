import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get(`${API_URL}/clubs`, {
          withCredentials: true,
        });
        setClubs(res.data);
      } catch (err) {
        console.error("Error fetching clubs:", err);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Clubs
      </h2>

      {clubs.length === 0 ? (
        <p className="text-gray-500 text-center">No clubs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              onClick={() => setSelectedClub(club)}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={club.imageUrl}
                alt={club.clubName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-blue-600 mt-2 text-center">
                {club.clubName}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setSelectedClub(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              {selectedClub.clubName}
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedClub.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
