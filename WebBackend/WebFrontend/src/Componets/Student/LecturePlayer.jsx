import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { IoCaretBackSharp } from "react-icons/io5";
import { FiPlay, FiFileText, FiChevronRight } from "react-icons/fi";

function LecturePlayer() {
    const { courseId } = useParams();
    const [units, setUnits] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`/olms-api/user/courses/course-id/${courseId}`);
            setUnits(res.data.units || []);
            if (res.data.units?.length > 0) {
                setSelectedVideo({
                    ...res.data.units[0],
                    embedUrl: getEmbedUrl(res.data.units[0].video)
                });
            }
        } catch (err) {
            toast.error("Error: " + (err.response?.data || err.message));
        }
    };

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
        return url;
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)] bg-slate-50">
            
            {/* Main Player Area - Occupies the left/center */}
            <main className="flex-grow p-4 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumbs / Back button */}
                    <div className="flex items-center gap-4 mb-6">
                        <Link 
                            to="/student" 
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
                        >
                            <IoCaretBackSharp />
                        </Link>
                        <div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Currently Playing</p>
                            <h2 className="text-xl font-bold text-slate-900">{selectedVideo?.unitTitle || "Select a Lesson"}</h2>
                        </div>
                    </div>

                    {selectedVideo ? (
                        <div className="animate__animated animate__fadeIn">
                            {/* Video Container with 16:9 Aspect Ratio */}
                            <div className="relative pt-[56.25%] bg-black rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={selectedVideo.embedUrl}
                                    title={selectedVideo.unitTitle}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Lesson Description Area */}
                            <div className="mt-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <FiFileText className="text-blue-600" /> Lesson Description
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    This lesson covers the core fundamentals of {selectedVideo.unitTitle}. 
                                    Follow along with the examples provided in the video to strengthen your understanding.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                            <FiPlay size={48} className="mb-4 opacity-20" />
                            <p>Select a lesson from the curriculum to begin</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Sidebar - Occupies the right on desktop */}
            <aside className="w-full lg:w-[400px] bg-white border-l border-slate-200 flex flex-col h-screen lg:h-[calc(100vh-80px)] sticky top-0">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                        Course Content <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full">{units.length} Lessons</span>
                    </h3>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-2">
                    {units.map((unit, index) => {
                        const isActive = selectedVideo?._id === unit._id;
                        return (
                            <button
                                key={unit._id}
                                onClick={() => setSelectedVideo({ ...unit, embedUrl: getEmbedUrl(unit.video) })}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all group ${
                                    isActive 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                                    : "bg-white hover:bg-slate-50 border border-transparent hover:border-slate-200"
                                }`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                                }`}>
                                    {index + 1}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-slate-800"}`}>
                                        {unit.unitTitle}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FiPlay size={10} className={isActive ? "text-white/70" : "text-blue-600"} />
                                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${isActive ? "text-white/70" : "text-slate-400"}`}>
                                            Video Lesson
                                        </span>
                                    </div>
                                </div>
                                {!isActive && <FiChevronRight className="text-slate-300 group-hover:text-slate-500" />}
                            </button>
                        );
                    })}
                </div>
            </aside>
        </div>
    );
}

export default LecturePlayer;