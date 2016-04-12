var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    methodOverride = require("method-override"),
    session = require("express-session"),
    cons = require("consolidate");

var app = express();


app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(cookieParser("seal",{
    maxAge:-1
}));

// var RedisStore = require('connect-redis')(session)
var MemcachedStore = require("connect-memcached")(session)
var cacheServer = require("./lib/config").cacheServer
var store = new MemcachedStore({
    hosts: cacheServer.hosts
})

app.use(session({
    name: "seal.sid",
    secret: "seal20151111",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
    },
    // store: new RedisStore({
    //     host:"192.168.0.162",
    //     port:"6379",
    //     prefix:"seal"
    // })
    // store: store
}))

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set("views", __dirname + '/../view');

if(process.env.NODE_ENV !== "production"){
    // app = require("../task/develop-middleware")(app)
}
var router = require("./router.js");
app.use(router);
app.use(require("./controller/main").errorHandler)

module.exports = app;
