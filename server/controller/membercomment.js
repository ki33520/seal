'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CommentApp = util.getSharedComponent("membercomment");
var config = require("../lib/config.js");

function formatComment(object) {
   return object.map((child,i)=>{
        return {
            content: child.content,
            imageUrlList: child.imageUrlList,
            imagesUrl: child.imagesUrl,
            createdAt: child.createdAt,
            id: child.id,
            orderItemId: child.orderItemId,
            orderTime: child.orderTime,
            isOpen: child.isOpen,
            isView: child.isView,
            productName: child.productName,
            singleCode: child.singleCode,
            singleImage: config.imgServer+child.singleImage,
            singleTitle: child.singleTitle,
            rate: child.rate
        };
    });
}

var index = function(req, res, next) {
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 5;
    bluebird.props({
        allComment: util.fetchAPI("memberCommentByUser", {
            memberId: user.memberId,
            pageNo: pageIndex,
            pageSize: pageSize
        },false)
    }).then(function(ret) {
        if (ret.allComment.returnCode === 0) {
            var allComment = {},
                object = ret.allComment.object;
            allComment.totalCount = object.totalCount;
            allComment.list = object.result ? _.slice(formatComment(object.result),0,pageIndex*pageSize) : [];
            allComment.pageIndex = pageIndex;
            allComment.pageSize = pageSize;
            if (req.xhr === true) {
                res.json({
                    allComment
                });
            } else {
                var initialState = {
                    isFetched: true,
                    allComment: allComment
                };
                var markup = util.getMarkupByComponent(CommentApp({initialState:initialState}));

                res.render('membercomment', {
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
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 5;
    bluebird.props({
        showComment: util.fetchAPI("memberCommentByUser", {
            memberId: user.memberId,
            pageNo: pageIndex,
            pageSize: pageSize
        },false)
    }).then(function(ret) {
        if (ret.showComment.returnCode === 0) {
            var showComment = {},
                object = ret.showComment.object;
            showComment.totalCount = object.totalCount;
            showComment.list = object.result ? _.slice(formatComment(object.result),0,pageIndex*pageSize) : [];
            showComment.pageIndex = pageIndex;
            showComment.pageSize = pageSize;
            res.json({
                showComment
            });
        }else{
            next(new Error(ret.showComment.message));
        }
    });
}

module.exports = {
    index: index,
    showComment: showComment
};