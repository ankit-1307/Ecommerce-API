const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide correct email value",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

//hashing the password
UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//comparing the hashed password
UserSchema.methods.comparePassword = async function (clientPassword) {
    const isMatched = await bcrypt.compare(clientPassword, this.password);
    return isMatched;
};

module.exports = mongoose.model("User", UserSchema)
