import Jwt from "jsonwebtoken";
import AppError from "../utils/error.util.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.Token;
    if (!token) {
      return next(new AppError("Unauthorized, please login again", 401));
    }

    const userDetails = await Jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: userDetails.id,
      email: userDetails.email,
      role: userDetails.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

export default isLoggedIn;
