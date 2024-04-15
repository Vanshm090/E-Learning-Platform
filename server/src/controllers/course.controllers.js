import AppError from "../utils/error.util.js";
import Course from "../models/course.model.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js";

const createCourse = async (req, res, next) => {
  const { title, description, numberOfLectures, category, createdBy } =
    req.body;

  if (!title || !description || !numberOfLectures || !category || !createdBy) {
    return next(new AppError("All feilds are required", 400));
  }

  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    return next(new AppError("thumbnail Required!!", 400));
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    return next(new AppError("thumbnail Required!!", 500));
  }
  try {
    const course = await Course.create({
      title,
      description,
      numberOfLectures,
      category,
      createdBy,
      thumbnail: thumbnail.url,
    });
    res.status(200).json({
      success: true,
      message: "Course created successfully!!",
      data: course,
    });
  } catch (error) {
    return next(new AppError(" Course Creation failed, please try again", 400));
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const courseid = req.params.id;

    const course = await Course.findByIdAndUpdate(
      courseid,
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!course) {
      return next(new AppError("course not exist", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course Updateded successfully!!",
      data: course,
    });
  } catch (error) {
    return next(new AppError("Course updation failed" + error.message, 400));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return next(new AppError("Course not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    return next(new AppError("Course deletion failed", 500));
  }
};

const getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (error) {
    return next(new AppError( error.message, 400));
  }
};

export { createCourse, updateCourse, deleteCourse, getAllCourse };
