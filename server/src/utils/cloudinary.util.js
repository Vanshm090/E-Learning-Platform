import { v2 as cloudinary } from "cloudinary";
import AppError from "./error.util.js";
import fs from "fs";
import { config } from "dotenv"; //for cloudinaryy enviornment cariables
config();

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
      resource_type: "auto",
    });
    console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    throw new AppError(error || "File uploading failed!", 400);
  }
};

export default uploadOnCloudinary;
