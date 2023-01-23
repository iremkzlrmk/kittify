const express = require("express");

const app = express();
app.listen(3001);

app.get("/", (req, res) => {
    res.send("homepage of the server");
});

app.get("/getText/:text_id", (req, res) => {

    if (req.params["text_id"] == 999){
        res.send("text 999");
        console.log("success");
    }

    if (req.params["text_id"] == 666){
        res.send("text 666");
        console.log("success");
    }

    else {
        res.send("text does not exist");
        console.log("failure");
    }
});


app.get("/getImage/:image_id", (req, res) => {

    if (req.params["image_id"] == 999){
        res.sendFile("./aesth.jpg", { root: __dirname });
        console.log("success");
        return;
    }

    if (req.params["image_id"] == 666){
        res.sendFile("./aesth.jpg", { root: __dirname });
        console.log("success");
        return;
    }
    
    else {
        res.send("image does not exist");
        console.log("failure");
    }
});


app.get("/getTrack/:track_id", (req, res) => {

    if (req.params["track_id"] == 999){
        res.sendFile("./ending_credits_meri.mp3", {root: __dirname});
        console.log("success");
    } 

    else {
        res.send("track does not exist");
        console.log("failure");
    }
});