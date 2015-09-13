'use strict';

var express = require('express');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');
var modRewrite = require('connect-modrewrite');

app.use(compression());
app.use(serveStatic("" + __dirname + '/dist'));
app.use(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf$ ' + __dirname + "/dist/index.html" + ' [L]']));
app.listen(process.env.PORT || 5000);

// app.all('/*', function(req,res,next) {
// 	res.sendfile(__dirname + '/dist/index.html');
// });