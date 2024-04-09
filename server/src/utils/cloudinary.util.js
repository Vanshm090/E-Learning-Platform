import { v2 as cloudinary } from "cloudinary";
import AppError from "./error.util.js";

cloudinary.config({
  cloud_name: "domofbgek",
  api_key: "311656935833367",
  api_secret: "ZLY-zpXSqwntopwDIJWl6-Kyj_8",
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
