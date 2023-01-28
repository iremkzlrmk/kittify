const express = require("express");
const fs = require("fs");

const trackDir = "../assets/tracks";
const audioDir = "../assets/audios";
const imageDir = "../assets/images";

const app = express();
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.status(200).send("hi kiyyu >.<");
});

app.get("/track/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    let trackMeta;
    try {
        let metaFile = fs.readFileSync(`${trackDir}/${trackId}.json`);
        trackMeta = JSON.parse(metaFile);
    } catch (err) {
        console.log("error: " + err.message);
        return res.status(404).send(err);
    }

    console.log(`kittify track ${trackId} sent successfully`);
    return res.status(200).send(trackMeta);

});


app.get("/image/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    let metaFile;
    try {
        metaFile = fs.readFileSync(`${trackDir}/${trackId}.json`);
        trackMeta = JSON.parse(metaFile);
    } catch (err) {
        console.log("error1: " + err.message);
        return res.status(404).send(err);
    }

    // let imageUrl = trackMeta.image;
    let imageFile;
    try {
        imageFile = fs.readFileSync(`${imageDir}/${trackId}.jpg`);
    } catch (err) {
        console.log("error2: " + err.message);
        imageFile = fs.readFileSync(`${imageDir}/default.jpg`);
    }

    console.log(`kittify track image ${trackId} sent successfully`);
    return res.status(200).contentType("image/jpeg").send(imageFile);

});


app.get("/audio/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    let metaFile;
    try {
        metaFile = fs.readFileSync(`${trackDir}/${trackId}.json`);
        trackMeta = JSON.parse(metaFile);
    } catch (err) {
        console.log("error1: " + err.message);
        return res.status(404).send(err);
    }

    let audioUrl = `${audioDir}/${trackId}.mp3`;
    var stat = fs.statSync(audioUrl);
    var total = stat.size;

    //media player

    // var stat = fs.statSync(audioPath);
    // var total = stat.size;
    // if (req.headers.range) {
    //     var range = req.headers.range;
    //     var parts = range.replace(/bytes=/, "").split("-");
    //     var partialstart = parts[0];
    //     var partialend = parts[1];

    //     var start = parseInt(partialstart, 10);
    //     var end = partialend ? parseInt(partialend, 10) : total - 1;
    //     var chunksize = (end - start) + 1;
    //     var readStream = fs.createReadStream(audioPath, { start: start, end: end });
    //     res.writeHead(206, {
    //         'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
    //         'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
    //         'Content-Type': 'audio/mpeg'
    //     });
    //     readStream.pipe(res);
    //     console.log(`total: ${total}, range: ${req.headers.range}, chunksize: ${chunksize}, end: ${end},  start: ${start}`);
    // } else {
    //     res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
    //     fs.createReadStream(audioPath).pipe(res);
    //     console.log(`total: ${total}, res: ${res}`);
    // }

    res.writeHead(200, {
        'Content-Length': total,
        'Content-Type': 'audio/mpeg'
    });
    
    fs.createReadStream(audioUrl).pipe(res);
    console.log(`total: ${total}, res: ${res}`);
});


app.get("/player/:trackId", async (req, res) => {

    const trackId = req.params.trackId;

    try{
        imageFile = fs.readFileSync(`${imageDir}/${trackId}.jpg`);
        audioFile = fs.readFileSync(`${audioDir}/${trackId}.mp3`);
    } catch (err) {
        return res.status(404).send(err);
    }

    let imageUrl = `http://localhost:4242/image/${trackId}`;
    let audioUrl = `http://localhost:4242/audio/${trackId}`;
    return res.status(200).render('kitty', { audio: audioUrl, image: imageUrl });

});


module.exports = app;