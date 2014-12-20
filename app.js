"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
    console.log("Hello Mars!")
    res.send("Hello Mars!");
});

app.get("/recipes/:name", function (req, res) {
    var recipeName = req.params.name;
    res.sendFile(__dirname + "/recipes/" + recipeName + ".json");
});

app.get("/recipes", function (req, res) {
    fs.readdir(__dirname + "/recipes", function (err, filenames) {
        if (err) {
            return res.status(500).send("Error reading recipes. " + err);
        }
        var names = filenames.map(function (name) {
            return name.split(".")[0];
        });
        res.send(names);
    });
});
module.exports = app;
