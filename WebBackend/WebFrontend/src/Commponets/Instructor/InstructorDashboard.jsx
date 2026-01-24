import React from 'react'
import Sidebar from '../Sidebar.jsx';
import { Outlet } from 'react-router-dom';

function InstructorDashboard() {
    return (
        <>
            <div style={{ minHeight: "calc( 100vh - 85px )" }} className="my-2 flex  gap-5 ">
                <Sidebar />
                <div className="w-full p-2 Box_Shedow rounded-2xl">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default InstructorDashboard