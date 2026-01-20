import CreateCourse from "../models/createcourse.model.js";

export const createcourse = async (req, res) => {
  const { title, description, thumbnail } = req.body;
  try {
    const newCourse = await new CreateCourse({
      title, description, thumbnail
    });
    await newCourse.save();
    if (newCourse) {
      res.status(201).json({
        message: "Course created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { course } = req.params;
    await CreateCourse.findByIdAndDelete(course);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const allCourseData = async (req, res) => {
  try {
    const data = await CreateCourse.find({}, "title description thumbnail createdAt").sort({ loginTime: -1 });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: " Fetching error" });
  }
}

export const addUnit = async (req, res) => {
  const { unitTitle, video } = req.body;
  try {
    const { courseId } = req.params;
    const course = await CreateCourse.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

      course.units.push({   unitTitle, video    });

    await course.save();
    if (course) {
      res.status(201).json({
        message: "Unit added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const { courseId, unitId } = req.params;

    const course = await CreateCourse.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.units = course.units.filter(
      (unit) => unit._id.toString() !== unitId
    );

    await course.save();

    res.json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const checkId = await CreateCourse.findById(courseId);
    if (!checkId) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(checkId);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};