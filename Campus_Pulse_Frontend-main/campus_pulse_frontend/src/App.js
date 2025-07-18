import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Body from "./components/Body";
import Home from "./components/Home";
import Clubs from "./components/Clubs";
import AboutUs from "./components/AboutUs";
import ProfilePage from "./components/ProfilePage";
import MainLayout from "./components/MainLayout";
import Career from "./components/Career";
import Faculty from "./components/Faculty";
import Admin from "./components/Admin";
import ExamSchedule from "./components/ExamSchedule";
import StudentDashboard from "./components/StudentDashboard";
import Foodmenu from "./components/Foodmenu";
import TimetableManager from "./components/TimetableManager";
import TimetableEditor from "./components/TimetableEditor";
import AcademicCalendar from "./components/AcademicCalendar";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<MainLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="examschedule" element={<ExamSchedule />} />
          <Route path="foodmenu" element={<Foodmenu />} />
          <Route path="timetable" element={<TimetableManager />} />
          <Route path="calendar" element={<AcademicCalendar />} />
          <Route path="about" element={<AboutUs />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<MainLayout />}>
          <Route index element={<Faculty />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="examschedule" element={<ExamSchedule />} />
          <Route path="foodmenu" element={<Foodmenu />} />
          {/* Add the new route for Edit Timetable */}
          <Route path="edit-timetable" element={<TimetableEditor />} />
          <Route path="calendar" element={<AcademicCalendar />} />
          <Route path="about" element={<AboutUs />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Admin />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="career" element={<Career />} />
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
