const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
            maxlength: [100, "Name cannot be more than 100 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            default: 0,
        },
        description: {
            type: String,
            trim: true,
            required: [true, "description is required"],
            maxlength: [
                1000,
                "description cannot be more than 1000 characters",
            ],
        },
        image: {
            type: String,
            default: "/uploads/example.jpeg",
        },
        category: {
            type: String,
            required: [true, "category is required"],
            enum: ["office", "kitchen", "bedroom"],
        },
        company: {
            type: String,
            required: [true, "company is required"],
            enum: {
                values: ["ikea", "liddy", "marcos"],
                message: "{VALUE} is not a valid company",
            },
        },
        colors: {
            type: [String],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        freeShipping: {
            type: Boolean,
            default: false,
        },
        inventory: {
            type: Number,
            required: [true, "Inventory is required"],
            default: 15,
        },
        averageRating: {
            type: Number,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ProductSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
    justOne: false,
    match: { rating: 4 },
});

module.exports = mongoose.model("Product", ProductSchema);
