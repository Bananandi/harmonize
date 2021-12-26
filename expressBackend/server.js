const { ObjectId } = require('mongodb');
const { dbConn } = require("./connDb.js");
const port = 3000;
const ip = "192.168.178.58";
const frontendPath = "C:/Users/Andreas/Desktop/github_harmonize/harmonize/svelteFrontend/public/";

// Set up express
const express = require('express');
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/*", (req, res) => {
    if (req.url === "/a") {
        // Send all songs
        const db = dbConn.getDb('songsDb');
        db.collection('songs')
            .find({})
            .toArray((err, dbRes) => {
                if (err) throw err;
                res.send(dbRes);
                console.log("Send all songs /a");
            });

    } else {
        // Send local file
        if (req.url === "/") req.url = "index.html";
        res.sendFile(frontendPath + req.url);
        console.log("Send file " + req.url);
    }
})

app.post("/*", (req, res) => {
    if (req.url === "/u") {
        // Update given song in db
        const db = dbConn.getDb("songDb");
        const myQuery = { _id: ObjectId(req.body._id) };
        // The $set operator replaces the value of a field with the specified value
        const updatedSong = {
            $set: {
                title: req.body.title,
                author: req.body.author,
                lyrics: req.body.lyrics
            }
        };
        db.collection("songs")
            .updateOne(myQuery, updatedSong, (err, dbRes) => {
                if (err) throw err;
                res.json(dbRes);
                console.log("Updated song /u");
            });

    } else if (req.url === "/s") {
        // Save given song into the db
        const db = dbConn.getDb("songDb");
        const newSong = {
            title: req.body.title,
            author: req.body.author,
            lyrics: req.body.lyrics,
        };
        db.collection("songs").insertOne(newSong, (err, dbRes) => {
            if (err) throw err;
            res.json(dbRes);
            console.log("Saved song /s");
        });

    } else if (req.url === "/r") {
        // Remove the given song
        const db = dbConn.getDb("songDb");
        const myQuery = { _id: ObjectId(req.body._id) };
        db.collection("songs").deleteOne(myQuery, (err, dbRes) => {
            if (err) throw err;
            res.json(dbRes);
            console.log("Removed song /r");
        });
    }
});


dbConn.connectToServer(
    (err) => {
        if (err) console.error(err);
    }
);

app.listen(port, ip, () => {
    console.log(`Server running on http://${ip}:${port}`)
});
