const express = require("express");

const app = express();

app.listen(3001);

app.get("/", (req, res) => {
    res.send("homepage of the server");
});

app.get("/getTrack/:track_id", (req, res) => {

    if (req.params["track_id"] == 666){
        res.send("track imported successfully");
        console.log("success");
    } else {
        res.send("song does not exist");
        console.log("failure");
    }
});