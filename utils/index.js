const { createJWT, isTokenValid, attachCookiesToResponse } = require("./JWT");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const checkOwnership = require("./checkOwnership");
const upload = require("./multer");
const uploadCloudinary = require("./cloudinary");

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    checkOwnership,
    upload,
    uploadCloudinary,
};
