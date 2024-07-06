const { createJWT, isTokenValid, attachCookiesToResponse } = require("./JWT");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const checkOwnership = require("./checkOwnership");

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    checkOwnership,
};
