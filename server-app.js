const express = require("express");
const fs = require("fs");

const app = express();
app.listen(3001);

app.get("/", (req, res) => {
    res.send("homepage of the server");
});

app.get("/getText/:text_id", async (req, res) => {

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


app.get("/getImage/:image_id", async (req, res) => {

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


app.get("/getTrack/:track_id", async (req, res) => {

    switch (parseInt(req.params.track_id)) {

        case 999:

            // if u wanna stream in 30s chunks 
            res.set('Content-Type', 'audio/mpeg');
            const stat = fs.statSync("./ending_credits_meri.mp3", { root: __dirname });
            // const file_size = stat.size;      // in case u need it to avoid errors 
            const chunk_size = (30 * 128000 / 8); // 30 seconds * ~128 kbps / 8 bits per byte = byte limit
            let byte_counter = 0;
            const read_stream = fs.createReadStream('audio.mp3');
            read_stream.on('data', (chunk) => {
            byte_counter += chunk.length;
            res.write(chunk);
            
            if (byte_counter >= chunk_size) {
                read_stream.destroy();
                res.end();
            }
            });
        
            // if u wanna stream the first x part
            // res.set('Content-Type', 'audio/mpeg');
            // const read_stream =  fs.createReadStream("./ending_credits_meri.mp3", { root: __dirname });
            // let byte_counter = 0;
            // const byte_limit = 10 * 128000 / 8;

            // read_stream.on("data", (chunk) => {
            //     byte_counter += chunk.length;
            //     res.write(chunk);
            //     if (byte_counter >= byte_limit) {
            //         read_stream.destroy();
            //         res.end();
            //     }
            // });

            // if u wanna go with sendfile instead of stream
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