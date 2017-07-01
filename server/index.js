require('es6-promise').polyfill();
require('isomorphic-fetch');
const express = require('express');
const config = require('./config');
const router = require('./router');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

router(app);

app.listen(config.port,()=>console.log("connect"));