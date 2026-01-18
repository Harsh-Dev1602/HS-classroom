import mongoose from "mongoose";

const createCourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const CreateCourse = mongoose.model("CreateCourse", createCourseSchema);
export default CreateCourse;