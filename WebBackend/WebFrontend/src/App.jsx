import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'animate.css';
import { useAuth } from "./Context/AuthProvider.jsx";

import Navbar from './Componets/Navbar';
import Home from './Componets/Home';
import SignUp from './Componets/SignUp';
import Login from './Componets/Login';
import Dashboard from './Componets/Dashboard.jsx';

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
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="w-full container mx-auto Font_Text px-2 leading-none">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
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
          </Routes>
        </>
      )}

      {/* Toast notifications */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: "100%",
            fontSize: '20px',
            fontWeight: "700",
            borderRadius: "12px",
            color: "#145da0",
            border: "solid 2px #145da0",
            backgroundColor: "white"
          },
          iconTheme: {
            secondary: 'white',
          },
        }}
      />
    </div>
  );
}

export default App;