import { Home, Calendar, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

const FacultySidebar = ({ className = "", onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Remove stored token
    navigate("/login"); // Redirect to login page
  };

  return (
    <aside
      className={`w-64 h-screen bg-gray-100 border-r border-gray-300 p-5 flex flex-col justify-between shadow-md
      ${className}`}
    >
      {/* Close button visible only on mobile */}
      <button
        onClick={onClose}
        className="sm:hidden mb-4 p-2 bg-gray-300 rounded hover:bg-gray-400 self-end"
        aria-label="Close sidebar"
      >
        Close
      </button>

      {/* Logo Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">CampuSphere</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <NavItem to="/faculty" icon={<Home size={22} />} label="Home" />
        <NavItem to="examschedule" icon={<Calendar size={22} />} label="Exam Schedule" />
        <NavItem to="foodmenu" icon={<FaUtensils size={22} />} label="Food Menu" />
        <NavItem to="calendar" icon={<Calendar size={22} />} label="View Calendar" />
        <NavItem to="edit-timetable" icon={<Calendar size={22} />} label="Edit Timetable" />
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition duration-200"
        >
          <LogOut size={22} />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

/* Sidebar Item Component */
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg text-gray-700 transition duration-200 hover:bg-blue-100 hover:text-blue-600 ${
          isActive ? "bg-blue-200 text-blue-600 font-semibold" : ""
        }`
      }
    >
      {icon}
      <span className="text-lg">{label}</span>
    </NavLink>
  );
};

export default FacultySidebar;
