import React from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

function CreateCourse() {

      const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()


    const onSubmit = async (data) => {
        const userInfo = {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
        };
        // console.log(userInfo);
        await axios.post("/olms-api/user/courses/create-course", userInfo)
          .then((response) => {
            if (response.data) {
              toast.success("Courser create successfully");
            }
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
            <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-6">
                <h2 className="Text_Color font-bold mb-4">Create Course</h2>
                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="mb-4 flex flex-col">
                            <input  {...register("title", { required: true })} placeholder="Course name" className="bg-white Box_Shedow outline-none rounded-md p-2 " type="text" />
                            {errors.title && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <textarea  {...register("description", { required: true })} placeholder="Description .." className="bg-white min-h-20 max-h-30 Box_Shedow rounded-md p-2 outline-none" type="text" />
                            {errors.description && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <input  {...register("thumbnail", { required: true })} placeholder="Thumbnail url (us link only).." className="bg-white Box_Shedow rounded-md p-2 outline-none" type="text" />
                            {errors.thumbnail && <span className='mt-1 text-red-600 font-semibold'>This field is required</span>}
                        </div>
                        <button className="Text_Color cursor-pointer border-2 border-[#145da0] font-bold py-2 rounded-full mt-4 ">Create</button>
                    </form>
            </div>
        </>
    )
}

export default CreateCourse