const { StatusCodes } = require("http-status-codes");

const createReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "create" });
};
const getAllReviews = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "getAllReviews" });
};
const getSingleReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "getSingleReview" });
};
const updateReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "updateReview" });
};
const deleteReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "deleteReview" });
};

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
