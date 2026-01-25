import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import seedAdmin from "./controllers/admin.controller.js";
import seedInstructor from "./controllers/instructor.controller.js";
import userRouter from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js"


dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 3002
const URL = process.env.MONGODB_URL

try {
  mongoose.connect(URL);
  console.log("Online learning management system  connected to mongoose db..");
   await seedAdmin(); 
   await seedInstructor();
} catch (error) {
  console.log(error);
}

app.use("/olms-api/user",userRouter);

app.use("/olms-api/user/courses",courseRoutes);


if (process.env.NODE_ENV === 'production') {
    const dirPath = path.resolve();
    app.use(express.static("./WebFrontend/dist"));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(dirPath,'./WebFrontend/dist','index.html'));
    });
}

app.listen(port, () => {
  console.log(`Web backend project listening on port http://localhost:${port}`)
})