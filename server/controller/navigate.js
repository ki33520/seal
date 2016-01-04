'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var NavigateApp = util.getSharedComponent("navigate");

var navigate = function(req, res, next) {
    bluebird.props({
        result: util.fetchAPI("fetchHotKeywords", {}, true)
    }).then(function(resp) {
     
        if(resp.result.returnCode===0){
            var initialState = {
                navigate: resp.result.object
            }; 

            var markup = util.getMarkupByComponent(NavigateApp({
                initialState:initialState
            }));

            res.render('navigate', {
                markup: markup,
                initialState: initialState
            });
        } 
    });
}
 

module.exports = navigate;