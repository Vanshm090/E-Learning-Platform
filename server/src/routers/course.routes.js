import Router from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
} from "../controllers/course.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import authorizedRoles from "../middlewares/authorizedRoles.js";

const courseRoute = Router();

courseRoute
  .route("/")
  .get(isLoggedIn, getAllCourse)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );

courseRoute
  .route("/:id")
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourse)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourse);

export default courseRoute;
