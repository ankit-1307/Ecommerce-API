const customError = require("../errors");

const checkOwnership = (requestUserId, productUserId) => {
    if (requestUserId !== productUserId.toString()) {
        throw new customError.UnauthorizedError(
            "Not Authorized to Update the products"
        );
    }
    return;
};

module.exports = checkOwnership;
