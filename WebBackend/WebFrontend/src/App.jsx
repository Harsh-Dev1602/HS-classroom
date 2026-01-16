import React from 'react'
import { Route, Routes , Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import 'animate.css';

import Navbar from './Commponets/Navbar'
import Home from './Commponets/Home'
import SignUp from './Commponets/SignUp'
import Login from './Commponets/Login'
// import Footer from './Commponets/Footer'
import { useAuth } from "./Context/AuthProvider.jsx";
import Dashboard from './Commponets/Dashboard.jsx';
import AdminDashboard from './Commponets/AdminDashboard.jsx';
import InstructorDashboard from './Commponets/InstructorDashboard.jsx';

function App() {

  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className="w-full container mx-auto Font_Text px-2 ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <SignUp />} />
          <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path='/dashboard' element={authUser ? (authUser?.user?.role === "@dmin" ? <Navigate to="/admin-dashboard" /> : (authUser?.user?.role === "instructor"?  <Navigate to="/instructor-dashboard" />: <Dashboard/>)) : (<Navigate to="/" />)} />
          <Route path='/admin-dashboard' element={authUser?.user?.role === "@dmin" ?<AdminDashboard/>:  <Navigate to="/" />}/>
          <Route path='/instructor-dashboard' element={authUser?.user?.role === "instructor"?<InstructorDashboard/> :  <Navigate to="/" />}/>
        </Routes>
        {/* <Footer /> */}
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
    </>
  )
}

export default App