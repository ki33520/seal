'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CommentApp = util.getSharedComponent("membercomment");

var index = function(req, res, next) {
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 5;
    bluebird.props({
        allComment: util.fetchAPI("allCommentByUser", {
            memberId: user.memberId,
            pageIndex: pageIndex,
            pageSize: pageSize
        },true)
    }).then(function(ret) {
        if (ret.allComment.code === "success") {
            var allComment = ret.allComment.page;
            allComment.list = _.slice(allComment.list,0,pageIndex*pageSize);
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
            next(new Error(ret.msg));
        }
    });
}

var showComment = function(req, res, next) {
    var user = req.session.user;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var pageSize = 5;
    bluebird.props({
        showComment: util.fetchAPI("showCommentByUser", {
            memberId: user.memberId,
            pageIndex: pageIndex,
            pageSize: pageSize
        },true)
    }).then(function(ret) {
        if (ret.showComment.code === "success") {
            var showComment = ret.showComment.page;
            showComment.list = _.slice(showComment.list,0,pageIndex*pageSize);
            showComment.pageIndex = pageIndex;
            showComment.pageSize = pageSize;
            res.json({
                showComment
            });
        }else{
            next(new Error(ret.msg));
        }
    });
}

module.exports = {
    index: index,
    showComment: showComment
};