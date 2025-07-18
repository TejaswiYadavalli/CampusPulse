import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";
import axios from "axios";
import AnnouncementPopup from "./AnnouncementPopup";

const MainLayout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState(""); // NEW
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Faculty Management");

  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/me`, {
          withCredentials: true,
        });

        const user = res.data.user;

        if (location.pathname.startsWith("/faculty")) {
          setUserName(user.name);
        } else if (location.pathname.startsWith("/student")) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else if (location.pathname.startsWith("/admin")) {
          setUserName("Admin");
        }

        setPhotoUrl(user.photoUrl); // SET PHOTO URL
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    const fetchAnnouncementCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
        setAnnouncementCount(res.data.length);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchUserDetails();
    fetchAnnouncementCount();
  }, [location.pathname]);

  const handleNotificationClick = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
      setAnnouncements(res.data);
      setShowPopup(true);
      setAnnouncementCount(0);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const baseClassWhite = `fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative`;

  const baseClassDark = `fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative`;

  const renderSidebar = () => {
    if (location.pathname.startsWith("/faculty"))
      return <FacultySidebar className={baseClassWhite} onClose={() => setSidebarOpen(false)} />;

    if (location.pathname.startsWith("/student"))
      return <StudentSidebar className={baseClassWhite} onClose={() => setSidebarOpen(false)} />;

    if (location.pathname.startsWith("/admin"))
      return (
        <AdminSidebar
          className={baseClassDark}
          onClose={() => setSidebarOpen(false)}
          setSelectedSection={setSelectedSection}
          activeLabel={selectedSection}
        />
      );

    return null;
  };

  return (
    <div className="flex h-screen">
      {renderSidebar()}
      <div className="flex flex-col flex-grow">
        <Navbar
          userName={userName}
          photoUrl={photoUrl} // ✅ pass photoUrl
          announcementCount={announcementCount}
          onNotificationClick={handleNotificationClick}
          onMenuClick={toggleSidebar}
        />
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet context={{ selectedSection, setSelectedSection }}  />
        </div>
      </div>

      {showPopup && (
        <AnnouncementPopup announcements={announcements} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );

  

};

export default MainLayout;
