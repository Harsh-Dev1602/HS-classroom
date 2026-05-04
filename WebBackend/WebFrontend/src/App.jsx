import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'animate.css';
import { useAuth } from "./Context/AuthProvider.jsx";

import Navbar from './Componets/Navbar.jsx';
import Home from './Componets/Home.jsx';
import SignUp from './Componets/SignUp.jsx';
import Login from './Componets/LogIn.jsx';
import Dashboard from './Componets/Dashboard.jsx';
import NotFound from "./Componets/NotFound.jsx";

import AdminDashboard from './Componets/Admin/AdminDashboard.jsx';
import InstructorDashboard from './Componets/Instructor/InstructorDashboard.jsx';
import StudentDashboard from './Componets/Student/StudentDashboard.jsx';

import Loader from './Loading/Loader.jsx';
import MyCourses from './Componets/Instructor/MyCourses.jsx';
import CreateCourse from './Componets/Instructor/CreateCourse.jsx';
import AddUnit from './Componets/Instructor/AddUnit.jsx';

import LecturePlayer from './Componets/Student/LecturePlayer.jsx';

function App() {
  const [authUser] = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mimicking initial data fetch
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-600">
      {loading ? (
        <Loader />
      ) : (
        <div className=" mx-auto transition-all duration-500 animate__animated animate__fadeIn">
          <Navbar />

          {/* Main Content Area: Added top padding for fixed nav if needed */}
          <main className="">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Home />} />
              <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <SignUp />} />
              <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />


              {/* Admin */}
              <Route path="/admin-dashboard" element={authUser?.user?.role === "@dmin" ? <Dashboard /> : <Navigate to="/" />} >
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* Instructor with nested routes */}
              <Route path="/instructor" element={authUser?.user?.role === "instructor" ? <Dashboard /> : <Navigate to="/" />}>
                <Route index element={<InstructorDashboard />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="add-unit/:courseId" element={<AddUnit />} />
              </Route>

              {/* Student with nested routes */}
              <Route path="/student" element={authUser ? <Dashboard /> : <Navigate to="/" />}>
                <Route index element={<StudentDashboard />} />
                <Route path="lecture/:courseId" element={<LecturePlayer />} />
              </Route>

              {/* Dashboard redirect based on role */}
              <Route path="/dashboard" element={
                authUser ?
                  (authUser?.user?.role === "@dmin" ? (<Navigate to="/admin-dashboard" />) :
                    (authUser?.user?.role === "instructor" ? (<Navigate to="/instructor" />) :
                      (authUser?.user ? (<Navigate to="/student" />) :
                        (< Navigate to="/" />)))) : <Navigate to="/" />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          
        </div>
      )}

      {/* Theme-matching Toast notifications */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: 'rounded-2xl shadow-2xl border border-gray-100',
          style: {
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: "600",
            color: "#1e293b",
            backgroundColor: "white",
            maxWidth: '500px'
          },
          success: {
            iconTheme: {
              primary: '#2563eb', // Theme blue
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

export default App;