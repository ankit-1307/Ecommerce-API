const express = require("express");
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewsController");

module.exports = router;
