const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed extension regex
    const filetypes = /jpeg|jpg|png|gif|text|txt/;
    // Check extension
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

module.exports = upload;
