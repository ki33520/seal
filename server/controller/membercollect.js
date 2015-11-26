'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CollectApp = util.getSharedComponent("membercollect");

var collectlist = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        memberCollectByUser: util.fetchAPI("memberCollectByUser", {
            memberId: "",
            pageIndex: 0,
            pageSize: 10
        },true)
    }).then(function(ret) {
        if (ret.memberCollectByUser.code === "success") {
            var collect = ret.memberCollectByUser.list;

            var initialState = {
                collect: collect
            };
            
            var markup = util.getMarkupByComponent(CollectApp({initialState:initialState}));

            res.render('membercollect', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    });
    
}

module.exports = collectlist;