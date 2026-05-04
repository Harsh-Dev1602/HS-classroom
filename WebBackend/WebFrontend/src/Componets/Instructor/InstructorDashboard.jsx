import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiBook, FiUsers, FiVideo, FiPlusCircle, FiBarChart2 } from 'react-icons/fi';

function InstructorDashboard() {
  const [authUser] = useAuth();
  const [courses, setCourses] = useState([]);
  const [totalUnits, setTotalUnits] = useState(0);

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
      // Note: In a production app, try to get this count in a single API call if possible
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
    <div className="p-6 md:p-10 animate__animated animate__fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Instructor <span className="text-blue-600">Portal</span>
          </h1>
          <p className="text-slate-500 mt-1">Welcome back, {authUser?.user?.fullname}. Here's what's happening with your courses.</p>
        </div>
        <Link 
          to="/instructor/create-course" 
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-blue-200"
        >
          <FiPlusCircle /> Create New Course
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Active Courses", value: courses.length, icon: <FiBook />, color: "blue" },
          { label: "Total Students", value: "0", icon: <FiUsers />, color: "indigo" },
          { label: "Total Lectures", value: totalUnits, icon: <FiVideo />, color: "emerald" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            <p className="text-slate-500 font-medium text-sm uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manage Content Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Content Management</h2>
            <p className="text-slate-300 mb-8 max-w-sm">
              Keep your curriculum up to date. Add new units, edit descriptions, or organize your lectures to improve student engagement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/instructor/my-courses" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                Manage Courses
              </Link>
              <button className="bg-slate-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-600 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
          <FiBarChart2 className="absolute -bottom-4 -right-4 text-white/10 text-[12rem] rotate-12" />
        </div>

        {/* Recent Activity / Status Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Status</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-sm text-slate-600 font-medium">All course systems are operational</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-slate-600 font-medium">New student enrolled in "Web Development"</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <p className="text-sm text-slate-400 font-medium italic">No pending assignments to grade</p>
            </div>
          </div>
          
          <div className="mt-10 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              <strong>Tip:</strong> Courses with at least 5 units and clear thumbnails see 40% higher student retention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;