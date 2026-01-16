import React from 'react'
import { Link } from "react-router-dom"
import Logo from "../../public/Logo_Img.png"
import { useAuth } from "../Context/AuthProvider.jsx";

function Navbar() {
   const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className=" h-15 rounded-2xl mt-2 Box_Shedow p-2 flex justify-evenly items-center">
        <Link to="/" className='flex justify-center items-center italic font-bold'>
          <img src={Logo} className='w-10 md:w-15 mr-2' />
          <h2 className='Text_Color '>HS</h2>
          <h3 className=' hidden sm:block text-gray-200'> classroom</h3>
        </Link>

        <div className={`${authUser ? " hidden": " "} space-x-1 md:space-x-4`}>
          <Link to="/signup" className='border-2 border-[#145da0] Text_Color py-1 px-2 font-semibold rounded-2xl'>Sign Up</Link>
          <Link to="/login" className='border-2 border-[#145da0] Text_Color py-1 px-2 font-semibold rounded-2xl'>Log In</Link>
        </div>

        
      </div>
    </>
  )
}

export default Navbar