import React from 'react'
import { useState } from 'react';
import { useAuth } from "../../Context/AuthProvider.jsx";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function MyCourses() {
  const [authUser] = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [authUser]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/olms-api/user/courses/all-course");
      setCourses(res.data);
    } catch (err) {
      toast.error("Error fetching results:", err.response?.data || err.message);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`/olms-api/user/courses/delete-course/${id}`);
       fetchCourses();
      toast.success("Course deleted successfully");
    } catch (err) {
      toast.error("Error fetching course:", err.response?.data || err.message);
    }
  };
  return (
    <>
      <div className=' p-5'>
        <h3>My Courses</h3>
        <div style={{ minHeight: "calc( 100vh - 200px )" }} className=' overflow-y-auto'>
          <div style={{ maxHeight: "calc( 100vh - 200px )" }} className="grid gap-5  lg:grid-cols-3">
            {
              courses.map((r) => (
                <div key={r._id} className=" w-full h-auto rounded-2xl p-4 Box_Shedow gap-3 ">
                  <img src={r.thumbnail} className='w-full h-50 object-cover rounded-2xl' />
                  <div>
                    <h2 className="font-bold text-[#051d40]">{r.title}</h2>
                    <p className='max-h-30 overflow-y-auto text-justify'>{r.description}</p>
                  </div>
                  <div className="flex justify-evenly mt-2">
                    <button className="bg-sky-700 font-bold p-2 px-6 cursor-pointer rounded-2xl text-white">Add</button>
                    <button onClick={() => deleteCourse(r._id)} className="bg-red-700 cursor-pointer font-bold p-2 px-6 rounded-2xl text-white">Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MyCourses