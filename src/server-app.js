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


// app.get("/player/:trackId", async (req, res) => {

//     const trackId = req.params.trackId;

// });



module.exports = app;