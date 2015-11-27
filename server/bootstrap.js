var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    cons = require("consolidate");

var app = express();

var router = require("./router.js");

app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(session({
    name: "seal.sid",
    secret: "seal20151111",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 * 12 //12 hour
    }
}))

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set("views", __dirname + '/../view');
app.use(router);

module.exports = app;
