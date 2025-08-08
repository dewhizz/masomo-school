import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeComponent from "./components/HomeComponent";
import NotAuthorized from "./components/NotAuthorized";
import NotFound from "./components/NotFound";

import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import ProtectedRoute from "./context/ProtectedRoute";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import AdminLayout from "./components/admin/AdminLayout";
import {AuthProvider} from "./context/AuthContext";
import Classes from "./components/admin/Classes";
import Teachers from "./components/admin/Teachers";
import Student from "./components/admin/Student";
import Parents from "./components/admin/Parents";
import ClassAdd from "./components/admin/forms/ClassAdd";
import ClassEdit from "./components/admin/forms/ClassEdit";
import TeacherAdd from "./components/admin/forms/TeacherAdd";
import TeacherEdit from "./components/admin/forms/TeacherEdit";
import ParentAdd from "./components/admin/forms/ParentAdd";
import ParentEdit from "./components/admin/forms/ParentEdit";
import StudentsAdd from "./components/admin/forms/StudentsAdd";
import StudentsEdit from "./components/admin/forms/StudentsEdit";
import ParentLayout from "./components/parent/ParentLayout";

function App() {
  return (
    <Router>
      {/* we wrap all routes inside the authprovider */}
      <AuthProvider>
        <Routes>
          {/* Admin protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<AdminDashBoard />} />
            <Route path="classes" element={<Classes />} />
            <Route path="classes/add" element={<ClassAdd />} />
            <Route path="classes/edit" element={<ClassEdit />} />

            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/add" element={<TeacherAdd />} />
            <Route path="teachers/edit" element={<TeacherEdit />} />

            <Route path="students" element={<Student />} />
            <Route path="students/add" element={<StudentsAdd />} />
            <Route path="students/edit" element={<StudentsEdit />} />

            <Route path="parents" element={<Parents />} />
            <Route path="parents/add" element={<ParentAdd />} />
            <Route path="parents/edit" element={<ParentEdit />} />
          </Route>

          {/* Teacher protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<TeacherDashBoard />} />
            
          </Route>

          {/* Parent protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <ParentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<ParentDashboard />} />
           
          </Route>

          <Route path="/" element={<HomeComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          {/* default routes */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
