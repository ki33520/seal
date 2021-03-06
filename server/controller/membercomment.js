'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CommentApp = util.getSharedComponent("membercomment");
var config = require("../lib/config.js");

function filterPrice(param){
    return param === null || param === "null" ? 0 : param; 
}

function formatComment(object) {
   return object.map((child,i)=>{
        var imageUrlList = [];
        if(child.imageUrlList && child.imageUrlList.length>0){
            imageUrlList = child.imageUrlList.map((v,k)=>{
                return config.imgServer+v;
            })
        };
        return {
            content: child.content,
            imageUrlList: imageUrlList,
            createdAt: child.createdAt,
            id: child.id,
            isView: child.isView,
            productName: child.productName,
            singleCode: child.singleCode,
            singleImage: config.imgServer+child.singleImage,
            singleTitle: child.singleTitle,
            rate: child.rate,
            salesPrice: filterPrice(child.salesPrice)
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
            allComment.pageCount = Math.ceil(allComment.totalCount/pageSize);
            allComment.list = object.result ? formatComment(object.result) : [];
            allComment.pageIndex = pageIndex;
            allComment.pageSize = pageSize;
            if (req.xhr === true) {
                res.json({
                    isFetched: true,
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
            hasImage: true,
            pageNo: pageIndex,
            pageSize: pageSize
        },false)
    }).then(function(ret) {
        if (ret.showComment.returnCode === 0) {
            var showComment = {},
                object = ret.showComment.object;
            showComment.totalCount = object.totalCount;
            showComment.pageCount = Math.ceil(showComment.totalCount/pageSize);
            showComment.list = object.result ? formatComment(object.result) : [];
            showComment.pageIndex = pageIndex;
            showComment.pageSize = pageSize;
            res.json({
                isFetched: true,
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