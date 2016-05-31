'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var IDcardApp = util.getSharedComponent("idcard");

var filterResult = function (data){
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
 
    util.fetchAPI("fetchIdcardList", param).then(function(resp) {
        if(resp.returnCode===0){
            var result = resp.object.result;
            var initialState = {
                idcardLIst: filterResult(result),
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
            next(new Error(resp.message)); 
        }
    },function(){
        next(new Error('api request failed'));
    });
}

var uploadIdcardImage = function(req,res,next){
    var user = req.session.user;
    var file = req.files[0];
    var param = {
        memberId: user.memberId,
        file: {
            value:file.buffer,
            options: {
              filename:file.originalname,
              contentType:file.mimetype
            }
        }
    };
    util.sendForm("uploadIdcardImage", param,{ method: 'POST'},["file"]).then(function(resp) {
        if(resp.returnCode===0){
            var result = resp.object;
            res.json({
                isUploaded:true,
                imgUrl:result.imgUrl,
                imgUri:result.imgUri
            });
        }else{
            res.json({
                isUploaded:false,
                errMsg:resp.message
            })
        }
    },function(){
        res.json({
            isUploaded:false,
            errMsg:"api request failed"
        })
    });
}

var addIdcard = function(req,res,next){
    var user = req.session.user;
    var param = {
        memberId: user.memberId,
        name:req.body.name,
        number:req.body.idcard,
        fontImg:req.body.fontImg,
        backImg:req.body.backImg
    };
    util.fetchAPI("addIdcard", param,false,{method:"POST"}).then(function(resp) {
        if(resp.returnCode===0){
            res.json({
                isAddCarded:true
            });
        }else{
            res.json({
                isAddCarded:false,
                errMsg:resp.message
            });
        }
    },function(){
        res.json({
            isAddCarded:false,
            errMsg:'api request failed'
        });
    });
}

var updateIdcard = function(req,res,next){
    var user = req.session.user;
    var name = req.body.name;
    var number = req.body.idcard;
    var fontImg = req.body.fontImg;
    var backImg = req.body.backImg;
    var id = req.body.id;
    var param = {
        id:id,
        memberId: user.memberId,
        name:name,
        number:number,
        fontImg:fontImg,
        backImg:backImg
    };
    util.fetchAPI("updateIdcard", param).then(function(resp) {
        if(resp.returnCode===0){
            var result = resp.object.result;
            res.json({
                isFetched:true,
                result:result
            });
        }else{
            next(new Error(resp.message)); 
        }
    },function(){
        next(new Error('api request failed'));
    });
}

var deleteIdcard = function(req,res,next){
    var user = req.session.user;
    var id = req.body.id;
    var param = {
        id:id
    };
    util.fetchAPI("deleteIdcard", param).then(function(resp) {
        if(resp.returnCode===0){
            var result = resp.object.result;
            res.json({
                isFetched:true,
                result:result
            });
        }else{
            next(new Error(resp.message)); 
        }
    },function(){
        next(new Error('api request failed'));
    });
}

module.exports = {
    idcardList:idcardList,
    uploadIdcardImage:uploadIdcardImage,
    addIdcard:addIdcard,
    updateIdcard:updateIdcard,
    deleteIdcard:deleteIdcard
};