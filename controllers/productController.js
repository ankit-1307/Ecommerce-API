const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const customError = require("../errors");
const { checkOwnership, upload, uploadCloudinary } = require("../utils");
const path = require("path");
const fs = require("fs");

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
    res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    let product = await Product.findById({ _id: productId });
    if (!product) {
        throw new customError.NotFoundError(
            `No product found fot the matching product id: ${productId}`
        );
    }
    //only created admin can update
    checkOwnership(req.user.userId, product.user);
    product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(StatusCodes.OK).json({
        msg: "Product updated successfully! ",
        product,
    });
};
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    let product = await Product.findById({ _id: productId });
    if (!product) {
        throw new customError.NotFoundError(
            `No product found fot the matching product id: ${productId}`
        );
    }
    //only created admin can update
    checkOwnership(req.user.userId, product.user);
    await product.deleteOne();
    res.status(StatusCodes.OK).json({ msg: "Product removed successfully!" });
};
const uploadImage = async (req, res) => {
    upload.array("images", 5)(req, res, async (err) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            if (req.files == undefined) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "No file selected!",
                });
            } else {
                //successfully uploading the files
                const filePaths = req.files.map(
                    (file) => `/uploads/${file.filename}`
                );
                const arrCloudUrl = await Promise.all(
                    filePaths.map(async (eachFile) => {
                        const cloudUrl = await uploadCloudinary(
                            path.join(__dirname, "../public", eachFile)
                        );
                        fs.unlinkSync(
                            path.join(__dirname, "../public", eachFile)
                        );
                        return cloudUrl.url;
                    })
                );
                res.status(StatusCodes.CREATED).json({
                    message: "File uploaded successfully!",
                    images: arrCloudUrl,
                });
            }
        }
    });
};

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};
