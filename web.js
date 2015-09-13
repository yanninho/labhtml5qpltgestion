'use strict';

var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);

// app.get('*', function(req,res,next) {
// 	res.sendfile(__dirname + 'dist/index.html');
// });