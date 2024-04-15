import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js";

const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httponly: true,
};

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  // console.log(req.body);//
  // console.log(req.file);/
  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new AppError("User Already Registered !!", 400));
  }
  const avatarLocalPath = req.file?.path;
  console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    return next(new AppError("Avatar Required!!", 400));
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // console.log(avatar);
  if (!avatar) {
    return next(new AppError("Avatar Required!!", 500));
  }
  try {
    const user = await User.create({
      fullName,
      email,
      password,
      avatar: avatar.url,
    });
    console.log(user);
    const token = await user.generateAuthToken();

    res.cookie("Token", token, cookieOption);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User registered successfully!!",
      data: user,
    });
  } catch (error) {
    return next(
      new AppError("User registration failed, please try again", 400)
    );
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email or Password Invalid", 400));
    }

    const token = await user.generateAuthToken();

    res.cookie("Token", token, cookieOption);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User logged in successfully!!",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("Token", null, {
      secure: true,
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully!!",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    return res.status(200).json({
      success: true,
      message: "user details",
      user,
    });
  } catch (error) {
    return next(new AppError("failed to load profile", 400));
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const newFullname = req.body.newFullName;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 400));
    }
    user.fullName = newFullname;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "user detail updated Succesfully!!",
      user,
    });
  } catch (error) {
    return next(new AppError("failed to update user", 400));
  }
};

export { register, login, logout, getProfile, updateUser };
