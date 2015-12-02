'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var HelpApp = util.getSharedComponent("help");

var index = function(req, res, next) {
    var user = req.session.user;
    var initialState = {
        helpInfo: {
        	isFetched: true
        }
    };
    
    var markup = util.getMarkupByComponent(HelpApp({initialState:initialState}));
    
    res.render('help', {
        markup: markup,
        initialState: initialState
    })
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
    sendFeedback: sendFeedback
};