'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var IDcardApp = util.getSharedComponent("idcard");

var idcardList = function(req, res, next) {
    var user = req.session.user;
    var param = {
        memberId: user.memberId,
        pageIndex:1,
        pageSize:10
    };
 
    util.fetchAPI("fetchIdcardList", param,true).then(function(resp) {
        if(resp.returnCode===0){
            var initialState = {
                idcardLIst: [],
                isFetched:true
            };
            var markup = util.getMarkupByComponent(IDcardApp({
                initialState: initialState
            }));
            res.render('idcard', {
                markup: markup,
                initialState: initialState
            });
        }else{
            if (req.xhr === true) {
                res.json({
                    idcardLIst:null,
                    isFetched:false
                });
            }else{
                next(new Error(resp.message)); 
            }
        }
    },function(){
        next(new Error('api request failed'));
    });
}

module.exports = {
    list:idcardList
};