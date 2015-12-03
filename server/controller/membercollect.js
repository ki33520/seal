'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CollectApp = util.getSharedComponent("membercollect");

var collectlist = function(req, res, next) {
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? req.query.pageIndex : 1;
    bluebird.props({
        memberCollectByUser: util.fetchAPI("memberCollectByUser", {
            memberId: "",
            pageIndex: pageIndex,
            pageSize: 10
        },true)
    }).then(function(ret) {
        if (ret.memberCollectByUser.code === "success") {
            if (req.xhr === true) {
                res.json(ret.memberCollectByUser.page);
            } else {
                var collect = ret.memberCollectByUser.page;
                var initialState = {
                    isFetched: true,
                    collect: collect
                };
                
                var markup = util.getMarkupByComponent(CollectApp({initialState:initialState}));

                res.render('membercollect', {
                    markup: markup,
                    initialState: initialState
                })
            }
            
        }else{
            next(new Error(ret.msg));
        }
    });
    
}

module.exports = collectlist;