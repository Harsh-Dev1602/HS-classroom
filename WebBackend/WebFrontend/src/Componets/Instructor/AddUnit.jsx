import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCaretBackSharp } from "react-icons/io5";



function AddUnit() {
  const { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`/olms-api/user/courses/course-id/${courseId}`);
      setCourses(res.data);
      setUnits(res.data.units);
    } catch (err) {
      toast.error("Error fetching results:", err.response?.data || err.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()


  const onSubmit = async (data) => {
    const userInfo = {
      unitTitle: data.title,
      video: data.video,
    };
    // console.log(userInfo);
    await axios.post(`/olms-api/user/courses/course-unit/${courseId}/unit`, userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Unit add successfully");
        }
        fetchCourses();
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  }
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);


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

    return "";
  };


  const deleteUnit = async (courseId, unitId) => {
    if (!window.confirm("Are you sure you want to delete this unit?")) return;

    try {
      await axios.delete(
        `/olms-api/user/courses/delete-unit/${courseId}/unit/${unitId}`
      );
      toast.success("Unit deleted successfully");
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data || err.message);
    }
  };
  return (
    <>
      <div style={{ minHeight: "calc( 100vh - 100px )" }} className=' overflow-y-auto'>
          <div className="flex p-5 gap-5 items-center">
          <Link to="/instructor/my-courses" ><IoCaretBackSharp className=' p-2 hover:bg-gray-100 text-5xl rounded-2xl'/></Link>
           <h2 className="Text_Color font-bold mb-4">{courses.title}</h2>
          </div>
          <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-6">
           
            <h3 className='text-center'>Add Unit</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-5">
              <div className="mb-4 flex flex-col">
                <input  {...register("title", { required: true })} placeholder="Unit name" className="bg-white Box_Shedow outline-none rounded-md p-2 " type="text" />
                {errors.title && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
              </div>
              <div className="mb-4 flex flex-col">
                <input  {...register("video", { required: true })} placeholder="video url (us link only).." className="bg-white Box_Shedow rounded-md p-2 outline-none" type="text" />
                {errors.video && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
              </div>
              <button className="Text_Color cursor-pointer border-2 border-[#145da0] font-bold py-2 rounded-full mt-4 ">Add unit</button>
            </form>
          </div>

          <div>
            <h2 className='p-4 font-bold'>all Unit</h2>
            <div className="flex flex-col gap-4">
              {
                units.map((r) => (
                  <div key={r._id} className="w-full flex justify-between items-start h-auto rounded-2xl p-4 bg-gray-50 gap-3 ">
                    <div className="flex items-center gap-2">
                      <iframe
                        className="w-30 h-20 object-cover rounded-2xl Box_Shedow"
                        src={getEmbedUrl(r.video)} />
                        <div className=" leading-8">
                      <h3 className="font-bold py-5 text-gray-950">{r.unitTitle}</h3>
                      <p className=' text-gray-500'>{new Date(r.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center ">
                      <button onClick={() => deleteUnit(courseId, r._id)} className="border-2 border-[#a01414] bg-[#a01414ce]  cursor-pointer font-bold p-1 rounded-2xl text-white"><RiDeleteBinLine /></button>
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

export default AddUnit