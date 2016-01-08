'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var OrderList = util.getSharedComponent("orderlist");

var orderList = function(req, res,next) {
    var user = req.session.user;
    var status = req.query.status !== undefined ? req.query.status : 0 ;
    var pageIndex = req.query.pageIndex !== undefined ? req.query.pageIndex : 1;
    var timeType = req.query.timeType !== undefined ? req.query.timeType : 0;
    util.fetchAPI("orderByUser", {
        memberId: 'fc6804de51c482730151e8ec0a080023',
        timeType: timeType,
        orderStatus: status,
        pageNo: pageIndex,
        pageSize: 10
    },false).then(function(resp) {
        console.log(resp)
        if (resp.returnCode === 0) {
            if (req.xhr === true) {
                res.json(resp);
            } else {
                var initialState = {
                    isFetched: true,
                    pagination: resp.object
                };
                var markup = util.getMarkupByComponent(OrderList({
                    initialState: initialState
                }));
                res.render('orderlist', {
                    markup: markup,
                    initialState: initialState
                })

            }
        }else{
            next(new Error(resp.msg))
        }
    })
};

module.exports = orderList;