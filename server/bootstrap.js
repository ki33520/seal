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
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(methodOverride());

// var NedbStore = require("nedb-session-store")(session);

app.use(session({
    name: "seal.sid",
    secret: "seal20151111",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path:"/",
        httpOnly:true,
        maxAge: 365 * 24 * 60 * 60 * 1000 //1 year
    },
    // store:new NedbStore({
    //     filename:__dirname + "/data/session.db"
    // })
}))

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set("views", __dirname + '/../view');

app.use(router);
app.use(require("./controller/main").errorHandler)

module.exports = app;
