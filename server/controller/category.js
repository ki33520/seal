'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CategoryApp = util.getSharedComponent("category");

var category = function(req, res, next) {
    bluebird.props({
        result: util.fetchAPI("fetchHotKeywords", {}, true)
    }).then(function(resp) {
     
        if(resp.result.returnCode===0){
            var initialState = {
                category: resp.result.object
            }; 

            var markup = util.getMarkupByComponent(CategoryApp({
                initialState:initialState
            }));

            res.render('category', {
                markup: markup,
                initialState: initialState
            });
        } 
    });
}
 

module.exports = category;