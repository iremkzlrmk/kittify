const express = require("express");
const fs = require("fs");

const app = express();
app.listen(3001);

app.get("/", (req, res) => {
    res.send("homepage of the server");
});

app.get("/getText/:text_id", (req, res) => {

    switch (parseInt(req.params.text_id)) {

        case 999:
            res.send("text 999");
            console.log("success");
            break;

        case 666:
            res.send("text 666");
            console.log("success");
            break;

        default:
            res.send("text does not exist");
            console.log("failure");
            break;
    }
});


app.get("/getImage/:image_id", (req, res) => {

    switch (parseInt(req.params.image_id)) {

        case 999:
            res.sendFile("./aesth.jpg", { root: __dirname });
            console.log("success999");
            break;

        case 666:
            res.sendFile("./aesth.jpg", { root: __dirname });
            console.log("success666");
            break;

        default:
            res.send("image does not exist");
            console.log("failure");
            break;
    }
});


app.get("/getTrack/:track_id", (req, res) => {

    switch (parseInt(req.params.track_id)) {

        case 999:
            const stream = fs.createReadStream("./ending_credits_meri.mp3");
            stream.pipe(res);
            // res.sendFile("./ending_credits_meri.mp3", { root: __dirname });
            console.log("success");
            break;

        case 666:
            res.sendFile("./ending_credits_meri.mp3", { root: __dirname });
            console.log("success");
            break;

        default:
            res.send("track does not exist");
            console.log("failure");
            break;
    }
});