const jwt = require("jsonwebtoken");

const createJWT = function ({ payload }) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    return token;
};

const isTokenValid = ({ token }) => {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
};

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
    //creating cookie and attaching them on res
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
