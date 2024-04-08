import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import AppError from "./error.util.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "Elp",
      width: "250",
      height: "250",
      gravity: "faces",
      crop: "fill",
      resource_type: "auto",
    });
    console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    return next(new AppError(error || "File uploading failed!", 400));
  }
};

export default uploadOnCloudinary;
