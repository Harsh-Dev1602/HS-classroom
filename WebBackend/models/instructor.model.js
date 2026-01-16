import mongoose from "mongoose";

const instructorSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        required: true,
    },
}, { timestamps: true });

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;