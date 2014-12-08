"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
    console.log("Hello Mars!")
    res.send("Hello Mars!");
});

app.get("/recipes/:name", function (req, res) {
    var recipeName = req.params.name;
//    var recipe = require('./recipes/' + recipeName);
//    console.log(recipe.name);
//    res.send(recipe);

    res.sendFile(__dirname + "/recipes/" + recipeName + ".json");
});

app.get("/recipes", function (req, res) {
    fs.readdir(__dirname + "/recipes", function (err, files) {
        if (err) {
            return res.status(500).send("Error reading recipes. " + err);
        }
        res.send(files);
    });
});
module.exports = app;
