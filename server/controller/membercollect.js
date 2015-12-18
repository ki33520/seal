'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CollectApp = util.getSharedComponent("membercollect");

var collectlist = function(req, res, next) {
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = req.query.pageSize !== undefined ? Number(req.query.pageSize) : 5;
    bluebird.props({
        memberCollectByUser: util.fetchAPI("memberCollectByUser", {
            memberId: user.memberId,
            pageIndex: pageIndex,
            pageSize: pageSize
        },true)
    }).then(function(ret) {
        if (ret.memberCollectByUser.code === "success") {
            var collect = ret.memberCollectByUser.page;
            collect.list = _.slice(collect.list,0,pageIndex*pageSize);
            collect.pageIndex = pageIndex;
            if (req.xhr === true) {
                res.json(collect);
            } else {
                var initialState = {
                    isFetched: true,
                    collect: collect,
                    pageSize
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