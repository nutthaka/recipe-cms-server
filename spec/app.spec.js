"use strict";

var expect = require("chai").expect;
var app = require("../app");
var request = require("request");

describe("recipe api", function () {
    var port;
    var server;
    var baseRecipeUrl;

    before(function (done) {
        server = app.listen(0, function () {
            port = server.address().port;
            baseRecipeUrl = "http://localhost:" + port + "/recipes";
            console.log("Server started at port: " + port);
            done();
        });
    });

    it("should return http status 200 and recipe name", function (done) {
        request.get({
            url: baseRecipeUrl + "/chicken-skewers",
            json: true
        }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.name).to.equal("Pistachio-crusted chicken skewers");
            done();
        });
    });

    it("should return a list of recipes", function (done) {
        request.get({
            url: baseRecipeUrl,
            json: true
        }, function (error, response, body) {
            console.log(typeof body);
            console.log(body.length);
            expect(response.statusCode).to.equal(200);
            expect(body).to.have.length.above(0);
            body.forEach(function (item) {
                expect(item).to.not.contain(".json");
            });
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