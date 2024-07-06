const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/JWT");

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new UnauthenticatedError("Authentication Invalid");
    }

    try {
        const { name, _id: userId, role } = isTokenValid({ token });

        req.user = { name, userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Invalid Authorization");
    }
};

const authorizePermissions = (...rest) => {
    return (req, res, next) => {
        if (!rest.includes(req.user.role)) {
            throw new UnauthorizedError("Not Authorized to access this route");
        }
        next();
    };
};

module.exports = { authenticateUser, authorizePermissions };
