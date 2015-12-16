'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CommentApp = util.getSharedComponent("membercomment");

var index = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        allComment: util.fetchAPI("memberCommentByUser", {
            memberId: user.memberId,
            pageIndex: 0,
            pageSize: 10
        },true),
        showComment: util.fetchAPI("memberCommentByUser", {
            memberId: "",
            pageIndex: 0,
            pageSize: 10
        },true)
    }).then(function(ret) {
        if (ret.allComment.code === "success" && ret.showComment.code === "success") {
            var initialState = {
                allComment: ret.allComment.list,
                showComment: ret.showComment.list
            };
            
            var markup = util.getMarkupByComponent(CommentApp({initialState:initialState}));

            res.render('membercomment', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    });
    
}

module.exports = {
    index: index
};