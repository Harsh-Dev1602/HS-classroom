import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider.jsx";

function SignUp() {
    const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
        };
        await axios.post("/olms-api/user/register", userInfo)
            .then((response) => {
                if (response.data) {
                    toast.success("Account created successfully!");
                }
                sessionStorage.setItem("OLMS_User", JSON.stringify(response.data));
                setAuthUser(response.data);
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

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
            {/* Background Decorative Elements mirroring themewagon.github.io_eduleb_.jpg */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="animate__animated animate__fadeInUp w-full max-w-md bg-white shadow-2xl shadow-blue-100/50 rounded-[2.5rem] p-8 md:p-10 relative z-10 border border-blue-50">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Join HS<span className="text-blue-600">classroom</span></h2>
                    <p className="text-gray-500 text-sm">
                        Start your journey toward mastering new skills today.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-700 ml-1 mb-1 uppercase tracking-wider">Full Name</label>
                        <input 
                            {...register("fullname", { required: true })} 
                            placeholder="John Doe" 
                            className="bg-gray-50 border border-gray-100 outline-none rounded-2xl p-4 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                            type="text" 
                        />
                        {errors.fullname && <span className='mt-1 ml-1 text-xs text-red-500 font-medium'>Full name is required</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-700 ml-1 mb-1 uppercase tracking-wider">Email Address</label>
                        <input 
                            {...register("email", { required: true })} 
                            placeholder="name@company.com" 
                            className="bg-gray-50 border border-gray-100 outline-none rounded-2xl p-4 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                            type="email" 
                        />
                        {errors.email && <span className='mt-1 ml-1 text-xs text-red-500 font-medium'>A valid email is required</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-700 ml-1 mb-1 uppercase tracking-wider">Password</label>
                        <input 
                            {...register("password", { required: true })} 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-100 outline-none rounded-2xl p-4 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                            type="password" 
                        />
                        {errors.password && <span className='mt-1 ml-1 text-xs text-red-500 font-medium'>Please create a password</span>}
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl mt-4 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                        Create Free Account
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-bold">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp