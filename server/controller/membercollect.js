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
            memberId: 'fc6804de51c482730151e8ec0a080023',
            pageIndex: pageIndex,
            pageSize: pageSize
        },false)
    }).then(function(ret) {
        console.log(ret)
        if (ret.memberCollectByUser.returnCode === 0) {
            var collect = {},
                object = ret.memberCollectByUser.object;
            collect.totalCount = object.totalCount;
            collect.list = _.slice(object.result,0,pageIndex*pageSize);
            collect.pageIndex = pageIndex;
            collect.pageSize = pageSize;
            
            if (req.xhr === true) {
                res.json(collect);
            } else {
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
            next(new Error(ret.memberCollectByUser.msg));
        }
    });
    
}

module.exports = collectlist;