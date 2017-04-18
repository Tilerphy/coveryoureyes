var express = require("express");
var app=express();
var http = require("http").Server(app);
var score = require("./score");
var user = require("./user");
app.use("/api/score", score);
app.use("/api/user", user);
http.listen(8080);
