import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import Router from "express";
const userRoute = Router();

//register
userRoute.post("/register", register);
//login
userRoute.post("/login", login);
//logout
userRoute.get("/logout", logout);
//profile
userRoute.get("/me", isLoggedIn, getProfile);

export default userRoute;
