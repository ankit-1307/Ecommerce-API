const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const Product = require("../models/Product");
const Review = require("../models/Review");
const { checkPermissions } = require("../utils");

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
    const reviews = await Review.find({}).populate({
        path: "product",
        select: "name price",
    });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({
        _id: reviewId,
    })
    if (!review) {
        throw new customError.BadRequestError(
            `No review for review id: ${reviewId}`
        );
    }
    res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
    if (!rating || !title || !comment) {
        throw new customError.BadRequestError(
            "rating, title, comment all are mandatory"
        );
    }
    const review = await Review.findOne({
        _id: reviewId,
    });
    if (!review) {
        throw new customError.BadRequestError(
            `Can not delete, No review exists for review id: ${reviewId}`
        );
    }
    checkPermissions(req.user, review.user);
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();

    res.status(StatusCodes.CREATED).json({ review });
};

const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({
        _id: reviewId,
    });
    if (!review) {
        throw new customError.BadRequestError(
            `Can not delete, No review exists for review id: ${reviewId}`
        );
    }
    checkPermissions(req.user, review.user);
    await review.deleteOne();
    res.status(StatusCodes.OK).json({ msg: "review deleted successfully" });
};

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
