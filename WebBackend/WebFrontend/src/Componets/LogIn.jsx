import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import { useAuth } from "../Context/AuthProvider.jsx";

function LogIn() {
    const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };
        
        await axios.post("/olms-api/user/login", userInfo)
            .then((response) => {
                if (response.data) {
                    toast.success("Welcome back! Login successful");
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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

            <div className="animate__animated animate__fadeInUp w-full max-w-md bg-white shadow-2xl shadow-blue-100/50 rounded-[2.5rem] p-8 md:p-12 relative z-10 border border-blue-50">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome <span className="text-blue-600">Back</span></h2>
                    <p className="text-gray-500 text-sm">
                        Please enter your details to access your dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-700 ml-1 mb-2 uppercase tracking-wider">Email Address</label>
                        <input 
                            {...register("email", { required: true })} 
                            placeholder="name@example.com" 
                            className="bg-gray-50 border border-gray-100 outline-none rounded-2xl p-4 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400" 
                            type="email" 
                        />
                        {errors.email && <span className='mt-2 ml-1 text-xs text-red-500 font-semibold'>Email address is required</span>}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center ml-1 mb-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
                        </div>
                        <input 
                            {...register("password", { required: true })} 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-100 outline-none rounded-2xl p-4 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400" 
                            type="password" 
                        />
                        {errors.password && <span className='mt-2 ml-1 text-xs text-red-500 font-semibold'>Password is required</span>}
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2">
                        Sign In
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                    <p className="text-gray-600 text-sm font-medium">
                        New to HSclassroom? <Link to="/signup" className="text-blue-600 hover:underline font-bold">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn