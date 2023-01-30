const express = require("express");
const path = require("path");
const fs = require("fs");

const assetsDir = path.join(__dirname, "../assets");

const app = express();

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
        let end = partialend ? parseInt(partialend, 10) : total-1;
        let chunksize = (end-start)+1;
        let readStream = fs.createReadStream(audioFile, {start: start, end: end});
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

module.exports = app;