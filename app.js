const express = require("express");
const http = require("http");

const app = express();
app.listen(3000);


app.get("/track/:track_id", (req, res) => {

    let track_id = req.params["track_id"];

    http.get(`http://localhost:3001/getTrack/${track_id}`, (resp) => {
        let data = '';
        
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
            res.send(data);
        });
        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    
});