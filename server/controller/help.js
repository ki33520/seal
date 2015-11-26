'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var HelpApp = util.getSharedComponent("help");

var index = function(req, res, next) {
    var user = req.session.user;
    var initialState = {};
    
    var markup = util.getMarkupByComponent(HelpApp({initialState:initialState}));

    res.render('help', {
        markup: markup,
        initialState: initialState
    })
}

module.exports = {
    index: index
};