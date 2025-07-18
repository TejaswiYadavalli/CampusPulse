import React, { useState, useRef, useEffect } from "react";
import { Bell, Menu, User, Settings, Info, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  userName = "John Doe",
  photoUrl = "",
  announcementCount = 0,
  onNotificationClick,
  onMenuClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleMenuClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // Clear tokens or session
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between px-6 relative z-50">
      <div className="flex items-center gap-4">
        {/* Hamburger menu button */}
        <button
          onClick={onMenuClick}
          className="sm:hidden p-2 rounded hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>

        {/* Logo */}
        <div className="text-xl font-bold text-blue-700 tracking-wide">
          Campus Pulse
        </div>
      </div>

      <div className="flex items-center gap-6 relative">
        {/* Greeting */}
        <span className="hidden sm:block text-gray-700 font-medium">
          Welcome,{" "}
          <span className="text-blue-600 font-semibold">{userName}</span>
        </span>

        {/* Notifications */}
        <button
          onClick={onNotificationClick}
          className="relative hover:bg-gray-100 p-2 rounded-lg transition"
          aria-label="Notifications"
        >
          <Bell size={24} className="text-gray-700" />
          {announcementCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {announcementCount}
            </span>
          )}
        </button>

        {/* Profile circle */}
<div className="relative" ref={dropdownRef}>
  <button
    onClick={toggleDropdown}
    aria-haspopup="true"
    aria-expanded={isDropdownOpen}
    className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600"
  >
    {photoUrl ? (
      <img
        src={photoUrl}
        alt="Profile"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ""; // fallback to text
        }}
      />
    ) : (
      <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        {userName?.[0]?.toUpperCase() || "P"}
      </div>
    )}
  </button>

  {/* Dropdown Menu */}
  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-fade-in-up">
      <button
        onClick={() => handleMenuClick("/student/profile")}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        <User size={18} /> View Profile
      </button>
      <button
        onClick={() => handleMenuClick("/settings")}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        <Settings size={18} /> Settings
      </button>
      <button
        onClick={() => handleMenuClick("/about")}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        <Info size={18} /> About Us
      </button>
      <div className="border-t border-gray-100" />
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
