'use strict';

//var _ = require("lodash");
//var bluebird = require("bluebird");
var util = require("../lib/util");
var AboutUs = util.getSharedComponent("aboutus");

var aboutus = function(req, res, next) {
    var user = req.session.user;

    var initialState = {};
    
    var markup = util.getMarkupByComponent(AboutUs({initialState:initialState}));

    res.render('aboutus', {
        markup: markup,
        initialState: initialState
    })
    
}

module.exports = aboutus;