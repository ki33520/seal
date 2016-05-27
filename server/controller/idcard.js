'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var IDcardApp = util.getSharedComponent("idcard");

var filter = function (data){
    var list = [];
    if(data && data.length){
        _.forEach(data,function(item){
            list.push({
                id:item.id,
                cardID:item.number,
                openId:item.openId,
                name:item.name,
                statusName:item.statusName,
                mobile:item.mobileNumber,
                status:item.status,
                fontImgUrl:item.fontImgUrl,
                backImgUrl:item.backImgUrl
            });
        });
    }
    return list;
}

var idcardList = function(req, res, next) {
    var user = req.session.user;
    var param = {
        memberId: user.memberId,
        pageIndex:1,
        pageSize:10
    };
 
    util.fetchAPI("fetchIdcardList", param,true).then(function(resp) {
        if(resp.returnCode===0){
            console.log(resp)
            var result = resp.object.result;
            var initialState = {
                idcardLIst: filter(result),
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