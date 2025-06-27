import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Upload local file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // ✅ File uploaded successfully
        console.log("File uploaded on Cloudinary:", response.url);
        fs.unlinkSync(localFilePath); // remove local file after upload
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath); // clean up local file if failed
        return null;
    }
};

// ✅ Upload image directly from URL
const uploadFromUrl = async (url, publicId = null) => {
    try {
        const response = await cloudinary.uploader.upload(url, {
            public_id: publicId,
            resource_type: "auto",
        });
        // console.log("File uploaded from URL:", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.error("Upload from URL failed:", error);
        return null;
    }
};

export { uploadOnCloudinary, uploadFromUrl };
