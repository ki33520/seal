var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    methodOverride = require("method-override"),
    session = require("express-session"),
    cons = require("consolidate"),
    compression = require("compression"),
    morgan = require("morgan");

var app = express();


app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(cookieParser("seal20151111",{
    maxAge:-1
}));

// var RedisStore = require('connect-redis')(session)
var MemcachedStore = require("connect-memcached")(session)
var cacheServer = require("./lib/config").cacheServer
var store = new MemcachedStore({
    hosts: cacheServer.hosts
})

app.use(session({
    // name: "seal.sid",
    secret: "seal20151111",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        // maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
    },
    store: store,
    // unset:"destroy"
}))

app.use(morgan('[:date[iso]] :remote-addr :method :url :status :res[content-length] - :response-time ms',{
    skip:function(req,res){
        var contentType = res.get("Content-Type")
        return contentType === "application/javascript" || contentType === "text/css"
    }
}))
app.use(compression())
app.set('trust proxy', 'loopback')

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set("views", __dirname + '/../view');

app.use(function(req,res,next){
    if(process.env.HMR_ENABLED){
        var hmrPort = process.env.HMR_PORT || 5000;
        // res.locals.hostname = ""
        res.locals.hostname = req.protocol+"://"+req.hostname+":"+hmrPort
    }
    next()
});

if(process.env.HMR_ENABLED){
    // app = require("../task/develop-middleware")(app)
}

var router = require("./router.js");
app.use(router);
app.use(require("./controller/main").errorHandler)

module.exports = app;
