import React from 'react'

function Dashboard() {
  return (
    <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-2">Total Courses: {0}</div>
                        <div className="bg-white p-2">Total Students: {0}</div>
                        <div className="bg-white p-2">Total Lectures: {0}</div>
                    </div>
    </div>
  )
}

export default Dashboard