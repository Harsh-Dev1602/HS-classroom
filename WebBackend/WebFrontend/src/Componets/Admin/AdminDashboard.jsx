import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiBook, FiUsers, FiLayers, FiActivity, FiExternalLink } from 'react-icons/fi';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/olms-api/user/courses/all-course");
      setCourses(res.data);
    } catch (err) {
      toast.error("Error fetching courses: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Mock Stats for the UI - You can later connect these to real API endpoints
  const stats = [
    { label: "Total Courses", value: courses.length, icon: <FiBook />, color: "bg-blue-500" },
    { label: "Active Students", value: "1.2k", icon: <FiUsers />, color: "bg-purple-500" },
    { label: "Total Units", value: "458", icon: <FiLayers />, color: "bg-emerald-500" },
    { label: "Platform Reach", value: "98%", icon: <FiActivity />, color: "bg-orange-500" },
  ];

  return (
    <div className="p-6 md:p-8 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
        <p className="text-slate-500 mt-1 font-medium">Monitoring platform-wide course metrics and content distribution.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center text-xl shadow-lg shadow-blue-100`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Master Course Directory</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline">Export CSV</button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 font-bold text-sm animate-pulse">Syncing Database...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Course Title</th>
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Description Preview</th>
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {courses.map(course => (
                  <tr key={course._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden">
                            <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{course.title}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="text-sm text-slate-500 line-clamp-1 max-w-xs">{course.description}</p>
                    </td>
                    <td className="p-5">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">Published</span>
                    </td>
                    <td className="p-5 text-center">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm">
                        <FiExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {courses.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="flex flex-col items-center">
                        <FiBook size={40} className="text-slate-200 mb-2" />
                        <p className="text-slate-400 font-bold">No courses live in the system</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard