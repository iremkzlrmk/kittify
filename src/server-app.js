const express = require("express");
const fs = require("fs");

const trackDir = "../assets/tracks";
const audioDir = "../assets/audios";
const imageDir = "../assets/images";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("hi kiyyu >.<");
});

app.get("/tracks/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    let trackMeta;
    try {
        let metaFile = fs.readFileSync(`${trackDir}/${trackId}.json`);
        trackMeta = JSON.parse(metaFile);
    } catch (err) {
        console.log("error: " + err.message);
        return res.status(400).send(err);
    }

    console.log(`kittify track ${trackId} sent successfully`);
    return res.status(200).send(trackMeta);

});


app.get("/images/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    let imageFile;
    try {
        imageFile = fs.readFileSync(`${imageDir}/${trackId}.jpg`);
    } catch (err) {
        console.log("error: " + err.message);
        return res.status(400).send(err);
    }

    console.log(`kittify track image ${trackId} sent successfully`);
    return res.status(200).contentType("image/jpeg").send(imageFile);

});


app.get("/player/:trackId", async (req, res) => {

    const trackId = req.params.trackId;
    const filePath = `${audioDir}/${trackId}.mp3`;

    //media player
    var stat = fs.statSync(filePath);
    var total = stat.size;
    if (req.headers.range) {
        var range = req.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total-1;
        var chunksize = (end-start)+1;
        var readStream = fs.createReadStream(filePath, {start: start, end: end});
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'audio/mpeg'
        });
        readStream.pipe(res);
        console.log(`total: ${total}, range: ${req.headers.range}, chunksize: ${chunksize}, end: ${end},  start: ${start}`); 
    } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        fs.createReadStream(filePath).pipe(res);
        console.log(`total: ${total}, res: ${res}`);
     }


});



module.exports = app;