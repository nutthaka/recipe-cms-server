"use strict";

var expect = require("chai").expect;
var app = require("../app");
var request = require("request");

describe("recipe api", function () {
    var port;
    var server;

    before(function (done) {
        server = app.listen(0, function () {
            port = server.address().port;
            console.log("Server starts at port: " + port);
            done();
        });
    });

    it("should return http status 200", function (done) {
        var url = "http://localhost:" + port + "/recipes/chicken-skewers";
        request.get(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    after(function (done) {
        server.close(function () {
            console.log("Server stopped");
            done();
        });
    });
});