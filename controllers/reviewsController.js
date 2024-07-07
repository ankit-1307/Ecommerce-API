const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const Product = require("../models/Product");
const Review = require("../models/Review");

const createReview = async (req, res) => {
    const { product: productId } = req.body;
    if (!productId) {
        throw new customError.BadRequestError("Product Id is mandatory");
    }
    const isValidProduct = await Product.findById({ _id: productId });

    if (!isValidProduct) {
        throw new customError.NotFoundError("No matching product found");
    }
    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId,
    });

    if (alreadySubmitted) {
        throw new customError.BadRequestError(
            "Review already submitted for this product"
        );
    }
    req.body.user = req.user.userId;
    console.log(req.body);
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review });
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
