'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var NavbarApp = util.getSharedComponent("navbar");

var navbar = function(req, res, next) {
    bluebird.props({
        result: util.fetchAPI("fetchHotKeywords", {}, true)
    }).then(function(resp) {
     
        if(resp.result.returnCode===0){
            var initialState = {
                navbar: resp.result.object
            }; 

            var markup = util.getMarkupByComponent(NavbarApp({
                initialState:initialState
            }));

            res.render('navbar', {
                markup: markup,
                initialState: initialState
            });
        } 
    });
}
 

module.exports = navbar;