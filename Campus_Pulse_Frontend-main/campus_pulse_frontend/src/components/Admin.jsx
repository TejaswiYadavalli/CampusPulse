import React from "react";
import { useOutletContext } from "react-router-dom";
import StatsCards from "./StatsCards";
import UserManagement from "./FacultyManagement";
import AddUserForm from "./AddFacultyForm";
import MessMenuManager from "./MessMenuManager";
import AdminExamSchedule from "./AdminExamSchedule";
import AdminEventForm from "./AdminEventForm";
import AddEventForm from "./AddEventForm";

const Admin = () => {
  const { selectedSection } = useOutletContext();

  return (
    <div className="flex-1 p-8 bg-gray-100 overflow-y-auto min-h-screen">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">{selectedSection}</h2>

      <StatsCards />

      {(selectedSection === "User Management" || selectedSection === "Faculty Management") && (
        <>
          <UserManagement />
          <AddUserForm />
        </>
      )}

      {selectedSection === "Update Academic Calendar" && <AddEventForm />}

      {selectedSection === "Update Events" && <AdminEventForm />}

      {selectedSection === "Edit Exam Schedule" && <AdminExamSchedule />}

      {selectedSection === "Menu Management" && <MessMenuManager />}
    </div>
  );
};

export default Admin;


/*import React, { useState } from "react";
import StatsCards from "./StatsCards";
import UserManagement from "./FacultyManagement";
import AddUserForm from "./AddFacultyForm";
import MessMenuManager from "./MessMenuManager";
import AdminExamSchedule from "./AdminExamSchedule";
import AdminEventForm from "./AdminEventForm";
import AddEventForm from "./AddEventForm";

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState("User Management");

  return (
    <div className="flex-1 p-8 bg-gray-100 overflow-y-auto min-h-screen">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">{selectedSection}</h2>

      <StatsCards />

      {(selectedSection === "User Management" || selectedSection === "Faculty Management") && (
        <>
          <UserManagement />
          <AddUserForm />
        </>
      )}

      {selectedSection === "Update Academic Calendar" && (
        <AddEventForm />
      )}

      {selectedSection === "Update Events" && (
        <AdminEventForm />
      )}

      {selectedSection === "Edit Exam Schedule" && (
        <AdminExamSchedule />
      )}

      {selectedSection === "Menu Management" && (
        <MessMenuManager />
      )}
    </div>
  );
};

export default Admin;

*/

// import React, { useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import StatsCards from "./StatsCards";
// import UserManagement from "./FacultyManagement";
// import AddUserForm from "./AddFacultyForm";
// import MessMenuManager from "./MessMenuManager";
// import AdminExamSchedule from "./AdminExamSchedule";
// import AdminEventForm from "./AdminEventForm";
// import AddEventForm from "./AddEventForm";

// const Admin = () => {
//   const [selectedSection, setSelectedSection] = useState("Faculty Management");

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar rendered only once */}
//       <AdminSidebar
//         setSelectedSection={setSelectedSection}
//         activeLabel={selectedSection}
//       />

//       {/* Content area */}
//       <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
//         <h2 className="text-4xl font-bold text-gray-900 mb-8">{selectedSection}</h2>

//         <StatsCards />

//         {selectedSection === "Faculty Management" && (
//           <>
//             <UserManagement />
//             <AddUserForm />
//           </>
//         )}

//         {selectedSection === "Update Academic Calendar" && <AddEventForm />}

//         {selectedSection === "Update Events" && <AdminEventForm />}

//         {selectedSection === "Edit Exam Schedule" && <AdminExamSchedule />}

//         {selectedSection === "Menu Management" && <MessMenuManager />}
//       </div>
//     </div>
//   );
// };

// export default Admin;
