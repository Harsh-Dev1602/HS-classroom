import React from 'react'
import { Link } from "react-router-dom"
import Logo from "../../public/Logo_Img.png"
import { useAuth } from "../Context/AuthProvider.jsx";
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar() {
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
      <div className=" h-15 rounded-2xl mt-2 Box_Shedow p-2 flex justify-evenly items-center">
        <Link to="/" className='flex justify-center items-center italic font-bold'>
          <img src={Logo} className='w-10 md:w-15 mr-2' />
          <h2 className='Text_Color '>HS</h2>
          <h3 className=' hidden sm:block text-gray-200'> classroom</h3>
        </Link>

        <div className={`${authUser ? " hidden" : " "} space-x-1 md:space-x-4`}>
          <Link to="/signup" className='border-2 border-[#145da0] Text_Color py-1 px-2 font-semibold rounded-2xl'>Sign Up</Link>
          <Link to="/login" className='border-2 border-[#145da0] Text_Color py-1 px-2 font-semibold rounded-2xl'>Log In</Link>
        </div>

        <div   className={`${authUser? "block": "hidden"}`}>
          <button onClick={handleLogout} className="bg-red-950 text-red-100 border border-red-400 border-b-4 cursor-pointer overflow-hidden relative px-4 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
               Log out
          </button>
        </div>

      </div>
    </>
  )
}

export default Navbar