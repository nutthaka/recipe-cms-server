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

    it("should return http status 200", function (done) {
        request.get(baseRecipeUrl + "/chicken-skewers", function (error, response, body) {
            expect(response.statusCode).to.equal(200);
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