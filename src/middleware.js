const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, `../uploads/images`);
        }
        else if (file.fieldname === "audio") {
            cb(null, `../uploads/audios`);
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
        else if (file.fieldname === "audio") {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).fields(
    [
        { name: 'image', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]
);

function checkFileType(file, cb) {
    if (file.fieldname === "image") {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    else if (file.fieldname === "audio") {
        if (
            file.mimetype === 'audio/mp4' ||
            file.mimetype === 'audio/m4a' ||
            file.mimetype === 'audio/mpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}

module.exports = {upload};