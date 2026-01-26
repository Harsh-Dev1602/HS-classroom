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
        // console.log(userInfo);
        await axios.post("/olms-api/user/login", userInfo)
          .then((response) => {
            if (response.data) {
              toast.success("Login successfully");
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
    <>
         <div style={{ minHeight: "calc( 100vh - 70px )" }}  className="flex items-center justify-center ">
                <div style={{ maxHeight: "calc( 100vh - 70px )" }} className="animate__animated animate__flipInY w-full Box_Shedow max-w-md bg-gray-50 rounded-lg  p-6 overflow-y-auto">
                    <h2 className=" font-bold Text_Color text-center">Welcome Back</h2>
                     <p className="text-center mb-4 text-gray-800">
                          Log in to continue your account
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="mb-4 flex flex-col">
                            <input  {...register("email", { required: true })} placeholder="Email address" className="bg-white Box_Shedow outline-none rounded-md p-2 " type="email" />
                            {errors.email && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <input  {...register("password", { required: true })} placeholder="Password" className="bg-white Box_Shedow rounded-md p-2 outline-none" type="password" />
                            {errors.password && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
                        </div>

                        <div className="flex items-center justify-between flex-wrap">
                            {/* <a className=" text-blue-500 hover:underline mb-0.5" href="#">Forgot password?</a> */}
                            <Link to="/signup"> Don't have an account? <span className=" text-[#145da0] hover:underline font-bold">Sign up</span></Link>
                        </div>
                        <button className="Text_Color cursor-pointer border-2 border-[#145da0] font-bold py-2 rounded-full mt-4 ">Log in</button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default LogIn