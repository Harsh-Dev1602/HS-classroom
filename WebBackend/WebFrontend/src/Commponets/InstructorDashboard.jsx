import React from 'react'
import { useAuth } from "../Context/AuthProvider.jsx";

function InstructorDashboard() {
    const [authUser, setAuthUser] = useAuth();
    return (
        <>
            <div style={{ minHeight: "calc( 100vh - 70px )" }} className="flex items-center justify-center ">
                <div style={{ maxHeight: "calc( 100vh - 70px )" }} className="animate__animated animate__flipInY w-full Box_Shedow max-w-md bg-gray-50 rounded-lg  p-6 overflow-y-auto">
                    <h2 className=" font-bold Text_Color text-center">{authUser?.user?.fullname}</h2>
                    <p className="text-center mb-4 text-gray-800">
                        {authUser?.user?.role}
                    </p>

                </div>
            </div>
        </>
    )
}

export default InstructorDashboard