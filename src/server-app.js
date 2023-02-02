const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// const upload = multer({ dest: "../uploads/" });
const assetsDir = path.join(__dirname, "../assets");

const app = express();

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, './uploads/images/')
        }
        else if (file.fieldname === "audio") {
            cb(null, './uploads/audios/');
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
    if (file.fieldname === "audio") {
        if (file.mimetype === 'audio/mpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    else if (file.fieldname === "image") {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            fiel.mimetype === 'image/gif'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}


// app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).send("hi kiyyu >.<");
});


app.get("/track/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    let track;
    try {
        let metaFile = fs.readFileSync(`${assetsDir}/tracks/${trackId}.json`);
        track = JSON.parse(metaFile);
    } catch (err) {
        if (err.code == "ENOENT") {
            console.log(`not found ~~ kittify:track:${trackId}`);
            return res.status(404).send(`not found ~~ kittify:track:${trackId}`);
        }
        console.log(`internal server error ~~ ${err}`);
        return res.status(500).send(`internal server error ~~ ${err}`);
    }

    console.log(`kittify:track:${trackId} sent successfully`);
    return res.status(200).send(track);

});


app.get("/image/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    try {
        let metaFile = fs.readFileSync(`${assetsDir}/tracks/${trackId}.json`);
    } catch (err) {
        if (err.code == "ENOENT") {
            console.log(`not found ~~ kittify:image:${trackId}`);
            return res.status(404).send(`not found ~~ kittify:image:${trackId}`);
        }
        console.log(`internal server error ~~ ${err}`);
        return res.status(500).send(`internal server error ~~ ${err}`);
    }

    let imageFile;
    try {
        imageFile = fs.readFileSync(`${assetsDir}/images/${trackId}.jpg`);
    } catch (err) {
        if (err.code == "ENOENT") {
            imageFile = fs.readFileSync(`${assetsDir}/images/default.jpg`);
            console.log(`kittify:track:image:default sent successfully`);
            return res.status(200).contentType("image/jpeg").send(imageFile);
        }
        console.log(`internal server error ~~ ${err}`);
        res.status(500).send(`internal server error ~~ ${err}`)
    }

    console.log(`kittify:track:image:${trackId} sent successfully`);
    return res.status(200).contentType("image/jpeg").send(imageFile);

});


app.get("/audio/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    try {
        let metaFile = fs.readFileSync(`${assetsDir}/tracks/${trackId}.json`);
    } catch (err) {
        if (err.code == "ENOENT") {
            console.log(`not found ~~ kittify:audio:${trackId}`);
            return res.status(404).send(`not found ~~ kittify:audio:${trackId}`);
        }
        console.log(`internal server error ~~ ${err}`);
        return res.status(500).send(`internal server error ~~ ${err}`);
    }

    let audioFile;
    let total;
    try {
        audioFile = `${assetsDir}/audios/${trackId}.m4a`;
        let stat = fs.statSync(audioFile);
        total = stat.size;
    } catch (err) {
        console.log(`internal server error ~~ ${err}`);
        return res.status(500).send(`internal server error ~~ ${err}`);
    }

    if (req.headers.range) {
        let range = req.headers.range;
        let parts = range.replace(/bytes=/, "").split("-");
        let partialstart = parts[0];
        let partialend = parts[1];

        let start = parseInt(partialstart, 10);
        let end = partialend ? parseInt(partialend, 10) : total - 1;
        let chunksize = (end - start) + 1;
        let readStream = fs.createReadStream(audioFile, { start: start, end: end });
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'audio/mp4'
        });
        readStream.pipe(res);
    } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mp4' });
        fs.createReadStream(audioFile).pipe(res);
        console.log(`streaming kittify:audio:${trackId}`);
    }
});


app.post("/upload", upload.array("image"), uploadFiles);

// function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.image);
//     res.json({ message: "files successfully uploaded.." });
// }

module.exports = app;

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) throw err;
    }) 
});