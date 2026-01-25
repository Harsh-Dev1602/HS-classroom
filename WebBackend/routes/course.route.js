import express from 'express';
import { addUnit, allCourseData, createcourse, deleteCourse, deleteUnit, getCourseById } from '../controllers/createcourse.controller.js';
import { secureRoute } from '../middleware/auth.js';

const router = express.Router();
// Courses API

router.post("/create-course", createcourse)
router.get("/all-course",secureRoute,allCourseData)
router.get("/course-id/:courseId",secureRoute , getCourseById)
router.delete("/delete-course/:course",deleteCourse)
router.post("/course-unit/:courseId/unit", addUnit)
router.delete("/delete-unit/:courseId/unit/:unitId", deleteUnit)




export default router;