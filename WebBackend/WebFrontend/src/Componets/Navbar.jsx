import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaUser, FaChevronDown } from "react-icons/fa"; // Added Chevron
import Logo from "../../public/Logo_Img.png"
import { useAuth } from "../Context/AuthProvider.jsx";
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await axios.post("/olms-api/user/logout");
      sessionStorage.removeItem("OLMS_User");
      toast.success("Log out successfully..");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <>
      {/* Container: Matching the white, clean look from themewagon.github.io_eduleb_.jpg */}
      <nav className="h-20 bg-white border-b border-gray-100 flex justify-between items-center px-6 md:px-12 sticky top-0 z-50">
        
        {/* Logo Section */}
        <Link to="/" className='flex items-center gap-2 group'>
          <img src={Logo} className='w-10 transition-transform group-hover:scale-110' alt="Logo" />
          <div className="flex flex-col leading-none">
            <span className='text-xl font-extrabold text-blue-600 tracking-tight'>HS</span>
            <span className='hidden sm:block text-[10px] uppercase tracking-widest text-gray-400 font-semibold'>Classroom</span>
          </div>
        </Link>


        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {!authUser ? (
            <div className="flex items-center space-x-3">
              <Link to="/login" className='text-slate-600 font-semibold px-4 py-2 hover:text-blue-600 transition'>
                Sign In
              </Link>
              <Link to="/signup" className='bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:scale-95'>
                Join For Free
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* User Profile Trigger */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition border border-gray-100"
              >
                <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <FaUser size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">{authUser.user.fullname.split(' ')[0]}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-semibold">{authUser?.user?.role}</p>
                </div>
                <FaChevronDown size={10} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsOpen(false)} 
                  />
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-slate-800">{authUser.user.fullname}</p>
                      <p className="text-xs text-gray-400 truncate">{authUser.user.email || 'Student'}</p>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-semibold transition"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar