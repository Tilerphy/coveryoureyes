var express = require("express");
var app=express();
var http = require("http").Server(app);
var score = require("./score");
app.use("/api", score);
http.listen(8080);
