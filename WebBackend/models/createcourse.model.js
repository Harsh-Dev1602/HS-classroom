import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    unitTitle: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
},{ timestamps: true });


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
    },
     units: [unitSchema]
}, { timestamps: true });

const CreateCourse = mongoose.model("CreateCourse", createCourseSchema);
export default CreateCourse;