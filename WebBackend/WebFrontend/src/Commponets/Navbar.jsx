import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa";
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
    }
    catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <div className=" h-15 rounded-2xl mt-2 Box_Shedow p-2 flex justify-between items-center">
        <Link to="/" className='flex justify-center items-center italic font-bold'>
          <img src={Logo} className='w-10 md:w-15 mr-2' />
          <h2 className='Text_Color '>HS</h2>
          <h3 className=' hidden sm:block text-gray-200'> classroom</h3>
        </Link>

        <div className={`${authUser ? " hidden" : " "} space-x-1 md:space-x-4`}>
          <Link to="/signup" className='border-2 border-[#145da0] Text_Color py-1 px-2 font-semibold rounded-2xl'>Sign Up</Link>
          <Link to="/login" className='border-2 border-[#145da0] Text_Color py-1 px-2 font-semibold rounded-2xl'>Log In</Link>
        </div>

        <div className={`${authUser?"block": "hidden"}`}>

          <span onClick={() => setIsOpen(false)} className={`${isOpen ? "fixed" : "hidden"} top-0 right-0 w-full cursor-pointer h-screen z-40 bg-transparent`}></span>
          <div className="relative inline-block text-left" onClick={() => setIsOpen(true)}  >
            {/* User Icon */}
            <button className="flex items-center">
              <FaUser className="text-4xl hover:border-2 hover:p-1 border-[#145da0] cursor-pointer text-[#145da0] bg-white rounded-xl p-1 transition" />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute z-50 w-50 transition-all duration-200 right-[5%] mt-2 Box_Shedow rounded-2xl p-1 ">
                <div className="bg-white rounded-2xl  p-3">
                  <h3 className="font-bold text-center Text_Color">{authUser.user.fullname}</h3>
                  <p className="text-center my-1 text-[18px] italic text-gray-800 ">{authUser?.user?.role}</p>
                  <button onClick={handleLogout} className="w-full bg-red-950  text-red-100 border border-red-400 border-b-4 cursor-pointer overflow-hidden relative px-4 py-1 rounded-2xl hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex rounded-2xl opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar