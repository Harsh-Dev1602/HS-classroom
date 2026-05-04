import React, { useEffect, useState } from 'react';
import { useAuth } from "../../Context/AuthProvider.jsx";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiPlus, FiTrash2, FiEdit3, FiCalendar, FiBookOpen } from 'react-icons/fi';

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
      toast.error("Error fetching courses: " + (err.response?.data || err.message));
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    try {
      await axios.delete(`/olms-api/user/courses/delete-course/${id}`);
      setCourses(courses.filter(course => course._id !== id));
      toast.success("Course removed successfully");
    } catch (err) {
      toast.error("Delete failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="p-6 md:p-8 animate__animated animate__fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">My Curriculum</h2>
          <p className="text-slate-500 mt-1">Manage your published content and course structures.</p>
        </div>
        <button 
          onClick={() => navigate('/instructor/create-course')}
          className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200"
        >
          <FiPlus /> New Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div 
              key={course._id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Thumbnail with Overlay Actions */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={course.title}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Live
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Meta Data */}
                <div className="flex items-center justify-between py-4 border-t border-slate-50 mt-auto">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiCalendar className="text-xs" />
                    <span className="text-[11px] font-medium">
                      {new Date(course.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiBookOpen className="text-xs" />
                    <span className="text-[11px] font-medium">LMS Ready</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button 
                    onClick={() => navigate(`/instructor/add-unit/${course._id}`)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <FiPlus /> Add Unit
                  </button>
                  <button 
                    onClick={() => deleteCourse(course._id)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-600 hover:text-white transition-all"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <FiBookOpen size={32} />
            </div>
            <p className="font-medium">No courses found. Start by creating your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;