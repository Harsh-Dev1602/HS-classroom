import React from 'react'
import { useState } from 'react';
import { useAuth } from "../../Context/AuthProvider.jsx";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyCourses() {

  const navigate = useNavigate();
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
      <h3 className='px-4 py-5 Text_Color'>My Courses</h3>
      <div style={{ minHeight: "calc( 100vh - 190px )" }} className=' overflow-y-auto'>
        <div style={{ maxHeight: "calc( 100vh - 190px )" }} className="grid gap-5  lg:grid-cols-3">
          {
            courses.map((r) => (
              <div key={r._id} className=" w-full h-auto rounded-2xl p-4 Box_Shedow gap-3 ">

                <img src={r.thumbnail} className='w-full h-50 object-cover rounded-2xl' />
                <div>
                  <h2 className="font-bold Text_Color text-center py-5 uppercase ">{r.title}</h2>

                  <p className='max-h-30 overflow-y-auto text-justify'>{r.description}</p>

                </div>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={() => navigate(`/instructor/add-unit/${r._id}`)} className="text-[#145da0] border-2 border-[#145da0]  font-bold py-1 px-3 cursor-pointer rounded-2xl ">Add unit</button>
                  <button onClick={() => deleteCourse(r._id)} className="border-2 border-[#a01414] bg-[#a01414ce]  cursor-pointer font-bold py-1 px-3 rounded-2xl text-white">Delete</button>
                </div>
                <p className='mt-5 text-gray-500'>{new Date(r.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}</p>

              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default MyCourses