'use strict';

var express = require('express');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');
var modRewrite = require('connect-modrewrite');

app.use(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf$ /index.html [L]']));
app.use(compression());
app.use(serveStatic("" + __dirname + '/dist'));
app.listen(process.env.PORT || 5000);