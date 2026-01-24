import React, { useEffect, useState } from 'react'
import { useAuth } from "../../Context/AuthProvider.jsx";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
  const [authUser ] = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/olms-api/user/courses/all-course');
        setCourses(res.data);
      } catch (err) {
        toast.error("Error fetching courses: " + (err.response?.data || err.message));
      }
    };
    fetchCourses();
  }, []);
  return (
    <> <div className="p-5">
      <h1 className=" font-bold text-[#145da0] mb-4">Welcome {authUser.user.fullname} 👩‍🎓</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded-2xl p-4 Box_Shedow">Total Courses: {courses.length}</div>
        <div className="bg-white rounded-2xl p-4 Box_Shedow">Completed Units: 0{/* logic here */}</div>
        <div className="bg-white rounded-2xl p-4 Box_Shedow">Upcoming Deadlines: 0{/* logic here */}</div>
      </div>

      <h2 className="text-xl font-semibold mt-6">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {courses.map(r => (
          <div key={r._id} className=" w-full h-auto rounded-2xl p-4 Box_Shedow gap-3 ">

                <img src={r.thumbnail} className='w-full h-50 object-cover rounded-2xl' />
                <div>
                  <h2 className="font-bold Text_Color text-center py-5 uppercase ">{r.title}</h2>

                  <p className='max-h-30 overflow-y-auto text-justify'>{r.description}</p>

                </div>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={() => navigate(`/dashboard/lecture/${r._id}`)} className="text-[#145da0] border-2 border-[#145da0]  font-bold py-1 px-3 cursor-pointer rounded-2xl ">Continue</button>
   
                </div>

              </div>
        ))}
      </div>
    </div>

    </>
  )
}

export default Dashboard