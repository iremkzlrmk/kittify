const express = require("express");
const http = require("http");
const fs = require("fs");

const serverUrl = "http://localhost:4242";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("hi kitty >.<");
});

app.get("/track/:trackId", (req, res) => {

    let trackId = req.params.trackId;

    http.get(`${serverUrl}/tracks/${trackId}`, (resp) => {

        if (resp.statusCode == 404){
            console.log("no such track exists"); 
            return res.status(404).send("no such track exists");
        }

        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(data);
            res.status(200).send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});


app.get("/image/:trackId", (req, res) => {

    let trackId = req.params.trackId;

    http.get(`${serverUrl}/images/${trackId}`, (resp) => {

        if (resp.statusCode == 400){
            console.log("no such track exists"); 
            return res.status(400).send("no such track exists");
        }

        resp.setEncoding('binary');
        let imageData = '';

        resp.on('data', (chunk) => {
            imageData += chunk;
        });

        resp.on('end', () => {
            const buffer = Buffer.from(imageData, "binary");
            // fs.writeFileSync('image.jpg', buffer);
            // console.log('image saved.');
            res.set('Content-Type', 'image/jpeg');
            res.send(buffer);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});


app.get("/audio/:trackId", (req, res) => {

    let trackId = req.params.trackId;

    http.get(`${serverUrl}/audios/${trackId}`, (resp) => {

        if (resp.statusCode == 400){
            console.log("no such track exists"); 
            return res.status(400).send("no such track exists");
        }

        resp.setEncoding('binary');
        let trackData = '';

        resp.on('data', (chunk) => {
            trackData += chunk;
        });

        resp.on('end', () => {
            const buffer = Buffer.from(trackData, "binary");
            // fs.writeFileSync('audio.mp3', buffer);
            // console.log('track saved.');
            res.set('Content-Type', 'audio/mpeg');
            res.send(buffer);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});


app.get("/play/:trackId", (req, res) => {

    let trackId = req.params.trackId;

    http.get(`${serverUrl}/player/${trackId}`, (resp) => {

        if (resp.statusCode == 400){
            console.log("no such track exists"); 
            return res.status(400).send("no such track exists");
        }
        
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send("no such track exists :\"")
    });
});

module.exports = app;