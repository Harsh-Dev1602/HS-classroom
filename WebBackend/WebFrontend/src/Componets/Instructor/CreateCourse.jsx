import React from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FiBook, FiAlignLeft, FiImage, FiPlusCircle } from 'react-icons/fi';

function CreateCourse() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
        };

        try {
            const response = await axios.post("/olms-api/user/courses/create-course", userInfo);
            if (response.data) {
                toast.success("Course created successfully! Time to add some units.");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message;
            toast.error("Failed to create course: " + errorMsg);
        }
    };

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8 animate__animated animate__fadeIn">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 text-3xl mb-4">
                    <FiPlusCircle />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Create New Course</h2>
                <p className="text-slate-500 mt-2">Fill in the details below to launch your new learning experience.</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-blue-900/5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Course Title */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                            <FiBook className="text-blue-600" /> Course Title
                        </label>
                        <input 
                            {...register("title", { required: "Course name is required" })} 
                            placeholder="e.g. Advanced React Architecture" 
                            className={`bg-slate-50 border ${errors.title ? 'border-red-400' : 'border-slate-100'} outline-none focus:border-blue-600 focus:bg-white transition-all rounded-2xl p-4 text-slate-900 placeholder:text-slate-400`} 
                            type="text" 
                        />
                        {errors.title && <span className='mt-1 ml-1 text-red-500 text-xs font-bold'>{errors.title.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                            <FiAlignLeft className="text-blue-600" /> Description
                        </label>
                        <textarea 
                            {...register("description", { required: "Description is required" })} 
                            placeholder="What will students learn in this course?" 
                            className={`bg-slate-50 border ${errors.description ? 'border-red-400' : 'border-slate-100'} min-h-32 outline-none focus:border-blue-600 focus:bg-white transition-all rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 resize-none`} 
                        />
                        {errors.description && <span className='mt-1 ml-1 text-red-500 text-xs font-bold'>{errors.description.message}</span>}
                    </div>

                    {/* Thumbnail URL */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                            <FiImage className="text-blue-600" /> Thumbnail URL
                        </label>
                        <input 
                            {...register("thumbnail", { required: "Thumbnail link is required" })} 
                            placeholder="https://image-link.com/thumbnail.jpg" 
                            className={`bg-slate-50 border ${errors.thumbnail ? 'border-red-400' : 'border-slate-100'} outline-none focus:border-blue-600 focus:bg-white transition-all rounded-2xl p-4 text-slate-900 placeholder:text-slate-400`} 
                            type="text" 
                        />
                        <p className="mt-2 ml-1 text-[10px] text-slate-400 italic">Pro-tip: Use high-quality 16:9 aspect ratio images.</p>
                        {errors.thumbnail && <span className='mt-1 ml-1 text-red-500 text-xs font-bold'>{errors.thumbnail.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={isSubmitting}
                        className={`w-full bg-slate-900 text-white font-black py-4 rounded-2xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:-translate-y-1'}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Launch Course'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCourse;