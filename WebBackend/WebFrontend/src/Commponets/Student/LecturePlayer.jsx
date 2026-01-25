import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { IoCaretBackSharp } from "react-icons/io5";

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
            console.log("Units:", res.data.units); // 👀 Debug
            setUnits(res.data.units);
            if (res.data.units?.length > 0) {
                // store embed URL instead of raw URL
                setSelectedVideo({
                    ...res.data.units[0],
                    embedUrl: getEmbedUrl(res.data.units[0].video)
                });
            }
        } catch (err) {
            toast.error("Error fetching results: " + (err.response?.data || err.message));
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return "";

        // youtu.be format
        if (url.includes("youtu.be")) {
            const id = url.split("/").pop();
            return `https://www.youtube.com/embed/${id}`;
        }

        // watch?v= format
        if (url.includes("watch?v=")) {
            const id = url.split("watch?v=")[1].split("&")[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        return url; // fallback
    };

    return (
        <div className="w-full flex justify-evenly">
            {/* Sidebar */}
            <div style={{ minHeight: "calc(100vh - 150px)" }} className="w-md bg-white p-4 overflow-y-auto">
                <aside style={{ maxHeight: "calc(100vh - 150px)" }}>
                    <div className="flex items-center mb-4">

                        <Link to="/student" ><IoCaretBackSharp className=' p-2 hover:bg-gray-100 text-5xl rounded-2xl' /></Link>
                        <h3 className="Text_Color font-bold">Course Units</h3>
                    </div>
                    <ul>
                        {units.map(r => (
                            <li
                                key={r._id}
                                className={`p-4 my-1 cursor-pointer rounded-2xl ${selectedVideo?._id === r._id
                                        ? "bg-[#145da0] text-white font-semibold"
                                        : "bg-gray-100"
                                    }`}
                                onClick={() =>
                                    setSelectedVideo({
                                        ...r,
                                        embedUrl: getEmbedUrl(r.video)
                                    })
                                }
                            >
                                <span className="block truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                    {r.unitTitle}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            {/* Main Content */}
            <main className="w-full p-6">
                {selectedVideo ? (
                    <div className="w-full bg-white p-4 Box_Shedow rounded-2xl">
                        <h3 className="Text_Color font-bold text-xl mb-4">{selectedVideo.unitTitle}</h3>
                        <iframe
                            className="w-full h-[460px] rounded-2xl Box_Shedow"
                            src={selectedVideo.embedUrl}
                            title={selectedVideo.unitTitle}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">Select a lecture from the sidebar.</p>
                )}
            </main>
        </div>
    );
}

export default LecturePlayer;