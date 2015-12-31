'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var Search = util.getSharedComponent("search");

var index = function(req, res, next) {
    bluebird.props({
        result: util.fetchAPI("fetchHotKeywords", {}, true)
    }).then(function(resp) {
     
        if(resp.result.returnCode===0){
            var initialState = {
                keywords: resp.result.object
            }; 

            var markup = util.getMarkupByComponent(Search({
                initialState:initialState
            }));

            res.render('search', {
                markup: markup,
                initialState: initialState
            });
        } 
    });
}
 

module.exports = {
    index: index
};