'use strict';

var express = require('express');
var app = express();
var compression = require('compression');
// var modRewrite = require('connect-modrewrite');

app.use(compression());
// app.use(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf$ ' + __dirname + "/dist" + ' [L]']));
app.listen(process.env.PORT || 5000);

// app.get('*', function(req,res,next) {
// 	res.sendfile(__dirname + 'dist/index.html');
// });