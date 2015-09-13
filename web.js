'use strict';

var gzippo = require('gzippo');
var express = require('express');
var app = express();
var modRewrite = require('connect-modrewrite');

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf$ /index.html [L]']));
app.listen(process.env.PORT || 5000);

// app.get('*', function(req,res,next) {
// 	res.sendfile(__dirname + 'dist/index.html');
// });