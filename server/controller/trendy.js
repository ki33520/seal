'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Trendy = util.getSharedComponent("trendy");

var trendy = function(req, res, next) {

    var pageIndex = req.query.pageIndex || 1;
    bluebird.props({
        goods: util.fetchAPI("fetchTendyGoods", {
            pageIndex: pageIndex,
            pageSize: 12
        }, true)
    }).then(function(resp) {
        // resp = resp[0].body
        if (resp.goods.code === "success") {
            resp.goods.list.map(function(v) {
                v.smallImageUrl = '/client/asset/' + v.smallImageUrl;
                v.flag = '/client/asset/'+ v.flag;
            })
            if (req.xhr === true) {
                res.json(resp);
            } else {
                 
                var initialState = {
                    pagination: resp.goods.list
                };

                var markup = util.getMarkupByComponent(Trendy({
                    initialState: initialState
                }));

                res.render('trendy', {
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



module.exports = trendy;