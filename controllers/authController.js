const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const customError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
    const { email, name, password } = req.body;
    // await User.deleteMany({});
    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
        throw new customError.BadRequestError("Email Already Exists");
    }
    const user = await User.create({ email, name, password });

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new customError.BadRequestError(
            "Please provide email and the password"
        );
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new customError.UnauthenticatedError("Invalid Credentials");
    }
    
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
        throw new customError.UnauthenticatedError("Invalid Credentials");
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = { register, login, logout };
