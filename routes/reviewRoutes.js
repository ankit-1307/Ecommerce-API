const express = require("express");
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewsController");
const {
    authenticateUser,
} = require("../middleware/authentication");

router.route("/").get(getAllReviews);

router.route("/").post(authenticateUser, createReview);

router
    .route("/:id")
    .get(getSingleReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser,  deleteReview);

module.exports = router;
