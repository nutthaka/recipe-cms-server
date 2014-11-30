"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log("Hello Mars!")
    res.send("Hello Mars!");
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
})