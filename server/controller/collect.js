'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CollectApp = util.getSharedComponent("collect");

var collectlist = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        getCollect: util.fetchAPI("getCollect", {
            memberId: "",
            pageIndex: 0,
            pageSize: 10
        },true)
    }).then(function(ret) {
        if (ret.getCollect.code === "success") {
            var collect = ret.getCollect.list;

            var initialState = {
                collect: collect
            };
            
            var markup = util.getMarkupByComponent(CollectApp({initialState:initialState}));

            res.render('collect', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    });
    
}

module.exports = collectlist;