'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var OrderList = util.getSharedComponent("orderlist");

var orderList = function(req, res,next) {
    var user = req.session.user;
    var status = req.query.status !== undefined ? req.query.status : "" ;
    var pageIndex = req.query.pageIndex !== undefined ? req.query.pageIndex : 1;
    util.fetchAPI("orderByParam", {
        memberId: user.memberId,
        orderStatus: status,
        pageIndex: pageIndex,
        pageSize: 10
    },true).then(function(resp) {
        if (resp.code === "success") {
            if (req.xhr === true) {
                res.json(resp);
            } else {
                console.log(resp.page)
                var initialState = {
                    isFetched: true,
                    pagination: resp.page
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