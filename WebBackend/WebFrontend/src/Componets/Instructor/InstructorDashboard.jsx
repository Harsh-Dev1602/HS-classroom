import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';


function InstructorDashboard() {
    const [authUser] = useAuth();
  const [courses, setCourses] = useState([]);
  const [totalUnits, setTotalUnits] = useState([0]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/olms-api/user/courses/all-course");
      setCourses(res.data);
    } catch (err) {
      toast.error("Error fetching courses: " + (err.response?.data || err.message));
    }
  };

  const fetchUnitCount = async () => {
    try {
      let unitCount = 0;
      for (const course of courses) {
        const res = await axios.get(`/olms-api/user/courses/course-id/${course._id}`);
        unitCount += res.data.units.length;
      }
      setTotalUnits(unitCount);
    } catch (err) {
      toast.error("Error fetching units: " + (err.response?.data || err.message));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [authUser]);

  useEffect(() => {
    if (courses.length > 0) {
      fetchUnitCount();
    }
  }, [courses]);
    return (
        <>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 py-10 gap-1">
                    <div className=" p-2 font-bold">
                        <span className='mr-5 Text_Color'>Total Courses: </span>{courses.length}
                    </div>
                    <div className=" p-2 font-bold">
                        <span className='mr-5 Text_Color'>Total Students:</span> {/* Add logic here */}
                    </div>
                    <div className=" p-2 font-bold">
                        <span className='mr-5 Text_Color'>Total Lectures: </span>{totalUnits}
                    </div>
                </div>

                {/* Welcome Section */}
                <div className="p-6 rounded-2xl bg-gray-100">
                    <h1 className="font-semibold mb-1 text-[#145da0]">Welcome, {authUser.user.fullname}</h1>
                    <p className="text-[#051d40]">
                        Manage your courses, upload lectures, and track student progress from here.
                    </p>
                </div>
            </div>
        </>
    )
}

export default InstructorDashboard