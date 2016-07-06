'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var HelpApp = util.getSharedComponent("help");

var formatComment = function(object){
    return object;
}

var index = function(req, res, next) {
    var user = req.session.user;

    bluebird.props({
        questionCategory: util.fetchAPI("questionCategory", {
        },false)
    }).then(function(ret) {
        var questionCategory = [];
        if (ret.questionCategory.returnCode === 0) {
            questionCategory = ret.questionCategory.object;
        }
        var initialState = {
            user:user,
            questionCategory : questionCategory
        };
        var markup = util.getMarkupByComponent(HelpApp({
            initialState: initialState
        }));
        res.render('help', {
            markup: markup,
            initialState: initialState
        });
    }).error(function() {
        next(new Error('api request failed'));
    });
}
var question = function(req, res, next) {
    var catalogId = req.query.catalogId;
    var catalogName = req.query.catalogName;
    var start = req.query.start ? Number(req.query.start) : 1;
    var limit = req.query.limit ? Number(req.query.limit) : 10;
    bluebird.props({
        questionList: util.fetchAPI("questionList", {
            catalogId: catalogId,
            start: start,
            limit: limit
        },false)
    }).then(function(ret) {
        if (ret.questionList.returnCode === 0) {
            var object = ret.questionList.object;
            var questionList = {
                totalCount: object.totalCount,
                pageCount: Math.ceil(object.totalCount/limit),
                list: object.result ? formatComment(object.result) : [],
                pageIndex: start,
                pageSize: limit,
                catalogName: catalogName,
                catalogId: catalogId
            };

            if (req.xhr === true){
                res.json({
                    isFetched: true,
                    questionList: questionList
                });
            }
        }else{
            next(new Error(ret.questionList.message));
        }
    }).error(function() {
        next(new Error('api request failed'));
    });
}
var sendFeedback = function(req, res, next) {
    var feedback = req.body.feedback;
    bluebird.props({
        sendFeedbackByUser: util.fetchAPI("sendFeedbackByUser", {
            memberId: "",
            feedback: feedback
        },true)
    }).then(function(ret) {
        if (ret.sendFeedbackByUser.code === "success") {
            var basicInfo = ret.sendFeedbackByUser.object;
            res.json({
                isChanged: true
            })
        }else{
            res.json({
                isChanged:false,
                errMsg:ret.sendFeedbackByUser.msg
            })
        }
    });
}

module.exports = {
    index: index,
    question: question,
    sendFeedback: sendFeedback
};