import { v2 as v2Cloudinary } from "cloudinary";
import fs from "fs/promises";

// configurations
v2Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Better version of this!

const uploadOntoCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("File path is not provided");
      return null;
    }

    const response = await v2Cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary successfully.", response.url);
    return response;
  } catch (error) {
    console.log("Some error occurred during file upload to Cloudinary!", error);
    return null;
  } finally {
    // Ensure the file is deleted, even if upload succeeds or fails
    try {
      await fs.unlink(localFilePath);
      console.log("Local file deleted successfully.");
    } catch (unlinkError) {
      console.log("Error deleting the local file:", unlinkError.message);
    }
  }
};

// const uploadOntoCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             console.log("File path is not provided");
//             return null;
//         }

//         const response = await v2Cloudinary.uploader.upload(localFilePath, {
//           resource_type: "auto",
//         });

//         // Whatever be the result, we tried uploading to cloudinary. So we should unlink the file:
//         fs.unlinkSync(localFilePath);
        
//         if (!response) {
//             console.log("File upload to cloudinary failed.");
//             return null;
//         }
//         else {
//             console.log("File uploaded to cloudinary successfully.", response.url);
//             return response;
//         }
        
//     } catch (error) {
//         console.log("Some error occured during file upload to cloudinary!", error);
//         fs.unlinkSync(localFilePath);
//         return null;
//     }
// }

export default uploadOntoCloudinary;