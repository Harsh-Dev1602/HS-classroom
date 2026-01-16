import React from 'react'
import { useAuth } from "../Context/AuthProvider.jsx";


function Dashboard() {
     const [authUser, setAuthUser] = useAuth();
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard