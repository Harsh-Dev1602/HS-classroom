import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function StudentDashboard() {
  return (
       <>
            <div style={{ minHeight: "calc( 100vh - 85px )" }} className="my-2 flex  gap-5 ">
                    <Outlet />
            </div>
        </>
  )
}

export default StudentDashboard