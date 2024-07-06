const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const customError = require("../errors");
const { checkOwnership } = require("../utils");

const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
        user: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.CREATED).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new customError.NotFoundError(
            `No product found fot the matching product id: ${productId}`
        );
    }
    res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    let product = await Product.findById({ _id: productId });
    if (!product) {
        throw new customError.NotFoundError(
            `No product found fot the matching product id: ${productId}`
        );
    }
    checkOwnership(req.user.userId, product.user);
    product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(StatusCodes.CREATED).json({
        msg: "Product updated successfully! ",
        product,
    });
};
const deleteProduct = async (req, res) => {
    res.status(StatusCodes.CREATED).json("deleteProduct");
};
const uploadImage = async (req, res) => {
    res.status(StatusCodes.CREATED).json("uploadImage");
};

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};
