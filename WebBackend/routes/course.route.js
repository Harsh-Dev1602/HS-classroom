import express from 'express';
import { allCourseData, createcourse, deleteCourse } from '../controllers/createcourse.controller.js';

const router = express.Router();
// Courses API

router.post("/create-course", createcourse)
router.get("/all-course", allCourseData)
router.delete("/delete-course/:course",deleteCourse)


export default router;