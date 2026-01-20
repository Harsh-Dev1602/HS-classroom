import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboardCustomize } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
<IoIosCreate />

function Sidebar() {
    return (
        <>
            <div className="w-60">
                <Link to="/instructor" className=" hover:bg-gray-400 flex items-center gap-2 p-2 rounded-2xl hover:text-white ">
                <MdDashboardCustomize className='Box_Shedow p-1 rounded-xl text-2xl' />Dashboard
                </Link>
                <Link to="/instructor/my-courses" className=" hover:bg-gray-400 flex items-center gap-2 p-2 rounded-2xl hover:text-white ">
                <IoBookmarksOutline className='Box_Shedow p-1 rounded-xl text-2xl' />My Courses
                </Link>
                <Link to="/instructor/create-course" className=" hover:bg-gray-400 flex items-center gap-2 p-2 rounded-2xl hover:text-white ">
                <IoIosCreate className='Box_Shedow p-1 rounded-xl  text-2xl' />Create Course
                </Link>
            </div>
        </>
    )
}

export default Sidebar