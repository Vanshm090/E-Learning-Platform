import {
  register,
  login,
  logout,
  getProfile,
  updateUser
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import Router from "express";

const userRoute = Router();

//register
userRoute.post("/register", upload.single("avatar"), register);
//login
userRoute.post("/login", login);
//logout
userRoute.get("/logout", logout);
//profile
userRoute.get("/me", isLoggedIn, getProfile);
//updateProfile
userRoute.post("/update",isLoggedIn, upload.single("avatar"),updateUser)

export default userRoute;
