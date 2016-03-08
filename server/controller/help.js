'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var HelpApp = util.getSharedComponent("help");

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
    var start = req.query.start ? req.query.start : 0;
    var limit = req.query.limit ?req.query.limit : 10;
    bluebird.props({
        questionList: util.fetchAPI("questionList", {
            catalogId: catalogId,
            start: start,
            limit: limit
        },false)
    }).then(function(ret) {
        console.log(ret)
        var questionList = [];
        if (ret.questionList.returnCode === 0) {
            questionList = ret.questionList.object;
        }
        if (req.xhr === true){
            res.json({
                isFetched: true,
                questionList: questionList
            });
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