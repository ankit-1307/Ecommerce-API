const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Please Provide a rating"],
        },
        title: {
            type: String,
            trim: true,
            max: 100,
            required: [true, "Please Provide a rating title"],
        },
        comment: {
            type: String,
            trim: true,
            required: [true, "Please Provide a comment"],
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);

//adding compound indexing
ReviewSchema.index({ product: 1 }, { user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
