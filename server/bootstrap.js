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
    // name: "seal.sid",
    secret: "seal20151111",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
    },
    store: store,
    // unset:"destroy"
}))

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
    app = require("../task/develop-middleware")(app)
}

app.use(function(req,res,next){
    var userAgent = req.headers['user-agent'].toLowerCase();
    var mobileAgent = ["iphone", "ipod", "ipad", "android", "mobile","windows phone","blackberry", "nokia"];
    var isMobile = false;
    var url = 'http://www.tepin.hk';
    for (var i=0,n=mobileAgent.length; i<n; i++){ 
        if (userAgent.indexOf(mobileAgent[i])!==-1){ 
            isMobile = true;
        }
    }
    if(false===isMobile){
        if(process.env.NODE_ENV==='test'){
            url = 'http://www.hwg.youayun.cn';
        }
        res.redirect(url);
    }else{
        next();
    }
});

var router = require("./router.js");
app.use(router);
app.use(require("./controller/main").errorHandler)

module.exports = app;
