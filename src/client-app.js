const express = require("express");
const http = require("http");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("hi kitty >.<");
});

app.get("/text/:text_id", (req, res) => {

    let text_id = req.params["text_id"];

    http.get(`http://localhost:3001/getText/${text_id}`, (resp) => {

        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(data);
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});


app.get("/image/:image_id", (req, res) => {

    let image_id = req.params["image_id"];

    http.get(`http://localhost:3001/getImage/${image_id}`, (resp) => {

        let content_type = resp.headers["content-type"].split(";").at(0);

        switch (content_type) {

            case "text/html":
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    console.log(data);
                    res.send(data);
                });
                break;

            case "image/jpeg":
                resp.setEncoding('binary');
                let imageData = '';

                resp.on('data', (chunk) => {
                    imageData += chunk;
                });

                resp.on('end', () => {
                    const buffer = Buffer.from(imageData, "binary");
                    fs.writeFileSync('image.jpg', buffer);
                    console.log('image saved.');
                    res.set('Content-Type', 'image/jpeg');
                    res.send(buffer);
                });
                break;
        }

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});


app.get("/track/:track_id", (req, res) => {

    let track_id = req.params["track_id"];

    http.get(`http://localhost:3001/getTrack/${track_id}`, (resp) => {

        let content_type = resp.headers["content-type"].split(";").at(0);

        switch (content_type) {

            case "text/html":
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    console.log(data);
                    res.send(data);
                });
                break;

            case "audio/mpeg":
                resp.setEncoding('binary');
                let trackData = '';

                resp.on('data', (chunk) => {
                    trackData += chunk;
                });

                resp.on('end', () => {
                    const buffer = Buffer.from(trackData, "binary");
                    fs.writeFileSync('audio.mp3', buffer);
                    console.log('track saved.');
                    res.set('Content-Type', 'audio/mpeg');
                    res.send(buffer);
                });
                break;
        }

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = app;