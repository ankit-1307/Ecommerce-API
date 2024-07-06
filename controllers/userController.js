const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../errors");
const {
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
        throw new NotFoundError(`No user found for the id: ${req.params.id}`);
    }
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new BadRequestError("name and email are required");
    }
    const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { name, email },
        { new: true, runValidators: true }
    );
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({
        msg: "user updated successfully",
        user: tokenUser,
    });
};

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError("Old and new passwords are mandatory");
    }
    const user = await User.findOne({ _id: req.user.userId });

    const isMatched = await user.comparePassword(oldPassword);
    if (!isMatched) {
        throw new UnauthorizedError("Invalid Credentials");
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
};
