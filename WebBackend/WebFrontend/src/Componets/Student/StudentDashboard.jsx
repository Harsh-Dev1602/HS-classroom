import React, { useEffect, useState } from 'react';
import { useAuth } from "../../Context/AuthProvider.jsx";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiBookOpen, FiCheckCircle, FiClock, FiPlayCircle } from 'react-icons/fi';

function StudentDashboard() {
  const navigate = useNavigate();
  const [authUser] = useAuth();
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
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="mb-10 animate__animated animate__fadeIn">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Welcome back, <span className="text-blue-600">{authUser?.user?.fullname}</span> 🎓
        </h1>
        <p className="text-slate-500 mt-2">Ready to continue your learning journey today?</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Courses", value: courses.length, icon: <FiBookOpen />, color: "blue" },
          { label: "Completed Units", value: "0", icon: <FiCheckCircle />, color: "green" },
          { label: "Upcoming Tasks", value: "0", icon: <FiClock />, color: "orange" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Course Section Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Courses</h2>
          <div className="h-1 w-12 bg-blue-600 rounded-full mt-2"></div>
        </div>
        <button className="text-blue-600 font-semibold text-sm hover:underline">View All</button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course._id} 
            className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Thumbnail Wrapper */}
            <div className="relative overflow-hidden h-48">
              <img 
                src={course.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={course.title}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <FiPlayCircle className="text-white text-5xl animate__animated animate__zoomIn" />
              </div>
            </div>

            {/* Content Wrapper */}
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Ongoing Course</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Progress Placeholder (Adds the 'LMS' feel) */}
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-slate-400">Progress</span>
                   <span className="text-xs font-bold text-blue-600">0%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                  <div className="bg-blue-600 h-full w-[5%] rounded-full"></div>
                </div>

                <button 
                  onClick={() => navigate(`/student/lecture/${course._id}`)}
                  className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;