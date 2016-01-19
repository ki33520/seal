'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CollectApp = util.getSharedComponent("membercollect");
var config = require("../lib/config.js");

function formatComment(object) {
   return object.map((child,i)=>{
        return {
            createdAt: child.createdAt,
            id: child.id,
            imageUrl: config.imgServer+child.imageUrl,
            originPrice: child.originPrice,
            productCode: child.productCode,
            salesPrice: child.salesPrice,
            singleCode: child.singleCode,
            sourceImage: config.imgServer+child.sourceImage,
            sourceName: child.sourceName,
            title: child.title
        };
    });
}

var collectlist = function(req, res, next) {
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 1;
    bluebird.props({
        memberCollectByUser: util.fetchAPI("memberCollectByUser", {
            memberId: user.memberId,
            pageIndex: pageIndex,
            pageSize: pageSize
        },false)
    }).then(function(ret) {
        if (ret.memberCollectByUser.returnCode === 0) {
            var collect = {},
                object = ret.memberCollectByUser.object;
            collect.totalCount = object.totalCount;
            collect.pageCount = Math.ceil(collect.totalCount/pageSize);
            collect.list = object.result ? formatComment(object.result) : [];
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