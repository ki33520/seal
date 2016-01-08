'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var ActivityApp = util.getSharedComponent("activity");

function filterResult(result){
    let list = [];


}

var activity = function(req, res, next) {

    let pageIndex = req.query.pageIndex || 1;
    bluebird.props({
        goods: util.fetchAPI("specialActivity", {
            activityId:req.params.id,
            start: pageIndex,
            limit: 12
        },true)
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            if (req.xhr === true) {
                res.json(resp);
            } else {
                 
                let initialState = {
                    isFetched: true,
                    title : '专场活动',
                    pagination: resp.goods.page
                };

                let markup = util.getMarkupByComponent(ActivityApp({
                    initialState: initialState
                }));

                res.render('activity', {
                    markup: markup,
                    initialState: initialState
                })
            }
        } else {
            next(new Error(resp.msg));
        }
    },function(){
       console.log('error')
    });

}

module.exports = activity;