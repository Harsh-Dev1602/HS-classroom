import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCaretBackSharp } from "react-icons/io5";
import { FiVideo, FiType, FiPlusCircle, FiList } from "react-icons/fi";

function AddUnit() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`/olms-api/user/courses/course-id/${courseId}`);
      setCourse(res.data);
      setUnits(res.data.units || []);
    } catch (err) {
      toast.error("Error fetching course data: " + (err.response?.data || err.message));
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const unitData = {
      unitTitle: data.title,
      video: data.video,
    };
    try {
      await axios.post(`/olms-api/user/courses/course-unit/${courseId}/unit`, unitData);
      toast.success("Unit added to curriculum!");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to add unit: " + (error.response?.data?.error || error.message));
    }
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return "";
  };

  const deleteUnit = async (courseId, unitId) => {
    if (!window.confirm("Are you sure you want to delete this unit?")) return;
    try {
      await axios.delete(`/olms-api/user/courses/delete-unit/${courseId}/unit/${unitId}`);
      toast.success("Unit removed");
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 md:p-8 animate__animated animate__fadeIn">
      {/* Navigation Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/instructor/my-courses" 
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-blue-600 hover:text-white transition-all text-slate-600"
        >
          <IoCaretBackSharp size={24} />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-slate-900">{course.title}</h2>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Curriculum Builder</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-blue-900/5 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FiPlusCircle /></div>
                <h3 className="font-bold text-slate-800">Add New Lesson</h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2 flex items-center gap-2">
                  <FiType /> Lesson Title
                </label>
                <input 
                  {...register("title", { required: true })} 
                  placeholder="e.g. Introduction to Hooks" 
                  className="bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white transition-all rounded-xl p-3 text-sm" 
                />
                {errors.title && <span className="text-[10px] text-red-500 font-bold mt-1">Title is required</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2 flex items-center gap-2">
                  <FiVideo /> Video Link (YouTube)
                </label>
                <input 
                  {...register("video", { required: true })} 
                  placeholder="https://youtube.com/..." 
                  className="bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white transition-all rounded-xl p-3 text-sm" 
                />
                {errors.video && <span className="text-[10px] text-red-500 font-bold mt-1">Video link is required</span>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-4 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                {isSubmitting ? "Processing..." : "Add to Curriculum"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: List of Units */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6 px-2">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FiList className="text-blue-600" /> Course Content 
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{units.length} Units</span>
             </h3>
          </div>

          <div className="space-y-4">
            {units.length > 0 ? (
              units.map((unit, index) => (
                <div 
                  key={unit._id} 
                  className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
                >
                  {/* Video Preview Small */}
                  <div className="relative w-32 h-20 flex-shrink-0 bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                    <iframe
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        src={getEmbedUrl(unit.video)} 
                        title="preview"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Unit Info */}
                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-black text-blue-600/50 uppercase tracking-tighter">Lesson {index + 1}</span>
                    <h4 className="font-bold text-slate-900 truncate pr-4">{unit.unitTitle}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Added {new Date(unit.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>

                  {/* Delete Action */}
                  <button 
                    onClick={() => deleteUnit(courseId, unit._id)} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all mr-2 shadow-sm shadow-red-100"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <FiVideo className="mx-auto text-slate-300 text-4xl mb-4" />
                <p className="text-slate-400 font-medium text-sm">No lessons added to this course yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddUnit;