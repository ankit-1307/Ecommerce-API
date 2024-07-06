const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
} = require("../controllers/productController");
const {
    authenticateUser,
    authorizePermissions,
} = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router
    .route("/")
    .post(
        authenticateUser,
        authorizePermissions("admin", "owner"),
        createProduct
    )
    .get(getAllProducts);

router
    .route("/uploadImage")
    .post(
        authenticateUser,
        authorizePermissions("admin", "owner"),
        uploadImage
    );

router
    .route("/:id")
    .get(getSingleProduct)
    .patch(
        authenticateUser,
        authorizePermissions("admin", "owner"),
        updateProduct
    )
    .delete(
        authenticateUser,
        authorizePermissions("admin", "owner"),
        deleteProduct
    );

module.exports = router;
