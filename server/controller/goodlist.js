'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var GoodListApp = util.getSharedComponent("goodlist");

var goodList = function(req, res, next) {

    var pageIndex = req.query.pageIndex || 1;
    bluebird.props({
        goods: util.fetchAPI("goodList", {
            pageIndex: pageIndex,
            pageSize: 12
        }, true)
    }).then(function(resp) {
        if (resp.goods.code === "success") {
            resp.goods.page.list.map(function(v) {
                v.smallImageUrl = '/client/asset/' + v.smallImageUrl;
                v.country.icon = '/client/asset/'+ v.country.icon;
            })
            if (req.xhr === true) {
                res.json(resp);
            } else {
                 
                var initialState = {
                    isFetched: true,
                    keywords : '奶粉',
                    pagination: resp.goods.page
                };

                var markup = util.getMarkupByComponent(GoodListApp({
                    initialState: initialState
                }));

                res.render('goodlist', {
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



module.exports = goodList;