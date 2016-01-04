'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CommentApp = util.getSharedComponent("goodcomment");

function formatComment(object) {
   return object.map((child,i)=>{
        return {
            productName: child.productName,
            content: child.content,
            rate: child.rate,
            imageUrlList: child.imageUrlList,
            origin: child.origin,
            originImageUrl: child.originImageUrl,
            isOpen: child.isOpen,
            isView: child.isView,
            id: child.id,
            createdAt: child.createdAt
        };
    });
}

var index = function(req, res, next) {
    var goodId = req.params.id;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 5;
    bluebird.props({
        allComment: util.fetchAPI("allCommentById", {
            productCode: goodId,
            pageIndex: pageIndex,
            pageSize: pageSize
        },true)
    }).then(function(ret) {
        if (ret.allComment.returnCode === 0) {
            var allComment = {},
                object = ret.allComment.object;
            allComment.totalCount = object.totalCount;
            allComment.list = _.slice(formatComment(object.result),0,pageIndex*pageSize);
            allComment.pageIndex = pageIndex;
            allComment.pageSize = pageSize;
            if (req.xhr === true) {
                res.json({
                    allComment
                });
            } else {
                var initialState = {
                    isFetched: true,
                    goodId: goodId,
                    allComment: allComment
                };
                var markup = util.getMarkupByComponent(CommentApp({initialState:initialState}));

                res.render('goodcomment', {
                    markup: markup,
                    initialState: initialState
                })
            }
        }else{
            next(new Error(ret.allComment.message));
        }
    });
}

var showComment = function(req, res, next) {
    var goodId = req.params.id;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 5;
    bluebird.props({
        showComment: util.fetchAPI("showCommentById", {
            productCode: goodId,
            pageIndex: pageIndex,
            pageSize: pageSize
        },true)
    }).then(function(ret) {
        if (ret.showComment.returnCode === 0) {
            var showComment = {},
                object = ret.showComment.object;
            showComment.totalCount = object.totalCount;
            showComment.list = _.slice(object.result,0,pageIndex*pageSize);
            showComment.pageIndex = pageIndex;
            showComment.pageSize = pageSize;
            res.json({
                showComment
            });
        }else{
            next(new Error(ret.message));
        }
    });
}

module.exports = {
    index: index,
    showComment: showComment
};