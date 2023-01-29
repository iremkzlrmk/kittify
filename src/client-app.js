const express = require("express");
const http = require("http");
const path = require("path");

const serverUrl = "http://localhost:4242";

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.status(200).send("hi kitty >.<");
});

app.get("/track/:trackId", (req, res) => {

    const trackId = req.params.trackId;

    http.get(`${serverUrl}/track/${trackId}`, (resp) => {

        if (resp.statusCode == 404){
            console.log("no such track exists"); 
            return res.status(404).send("no such track exists");
        }

        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let track = JSON.parse(data);
            res.status(200).render("kitty", { title: track.title, audio: track.audio, image: track.image});
            console.log(`kittify track ${trackId} loaded succesfully`);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = app;