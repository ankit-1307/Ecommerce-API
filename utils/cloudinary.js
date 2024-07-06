const cloudinary = require("cloudinary").v2;

const fs = require("fs");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localImagePath) => {
    if (!localImagePath) {
        throw new Error("No path for the image found");
    }
    try {
        const uploadResult = await cloudinary.uploader.upload(localImagePath, {
            folder: "Ecommerce API",
            use_filename: true,
        });
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localImagePath);
        return null;
    }
};

module.exports = uploadCloudinary;
