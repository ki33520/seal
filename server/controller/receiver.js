'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var sharedUtil = require("../../shared/lib/util.es6");
var util = require("../lib/util");
var config = require("../lib/config");
var Receiver = util.getSharedComponent("receiver");

var receiver = function(req, res, next) {
    var user = req.session.user;
    util.fetchAPI("receiverByUser", {
        memberId: user.memberId
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var receivers = receiversFilter(resp.object);
            // console.log('receivers',receivers)
            var initialState = {
                isFetched: true,
                receivers: receivers
            };
            var markup = util.getMarkupByComponent(Receiver({
                initialState: initialState
            }));
            res.render('receiver', {
                markup: markup,
                initialState: initialState
            })
        } else {
            next(new Error(resp.message))
        }
    }).fail(function(resp) {
        next(new Error("api response failed"))
    })
}

var receiverByUser = function(req,res,next){
    var id = req.params.id;
    var user = req.session.user;
    util.fetchAPI("receiverByUser", {
        memberId: user.memberId,
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var receivers = receiversFilter(resp.object);
            var initialState = {
                isFetched: true,
                result: receivers,
            };
            res.json(initialState);
        } else {
            res.json({
                isFetched:false,
                errMsg:resp.errMsg
            })
        }
    })
}

function receiversFilter(receivers) {
    var _receivers = []
    _.each(receivers, function(receiver) {
        var _receiver = receiverFilter(receiver)
        _receiver["id"] = receiver.recvAddressId
        var idCard = _.words(receiver["idCard"],/\d{1}/g)
        idCard = _.map(idCard,function(v,i){
            if(i > 5 && i < 14){
                v = "*"
            }
            return v
        })
        _receiver["idCard"] = idCard.join("")
        _receivers.push(_receiver)
    })
    return _receivers
}

var addReceiver = function(req, res) {
    var markup = util.getMarkupByComponent(ReceiverForm({
        initialState: {}
    }));
    res.render('receiverform', {
        markup: markup,
        initialState: initialState
    })
}

var receiverById = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;
    util.fetchAPI("receiverById", {
        memberId: user.memberId,
        recvAddressId: id
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var receiver = receiverFilter(resp.object);
            var initialState = {
                isFetched: true,
                receiver: receiver,
            };
            res.json(initialState);
        } else {
            res.json({
                isFetched:false,
                errMsg:resp.errMsg
            });
        }
    })
}

function receiverFilter(receiver) {
    var _receiver = _.pick(receiver, [
        "cityCode", "cityName","isDefault",
        "provinceCode", "provinceName", "isDefault", "idCard", "address", "zipcode"
    ]);
    _receiver["districtCode"] = receiver["countyCode"]
    _receiver["districtName"] = receiver["countyName"]
    _receiver["id"] = receiver["recvAddressId"]
    _receiver["consignee"] = receiver["recvLinkman"]
    _receiver["mobileNumber"] = receiver["recvMobile"]
    return _receiver
}

var saveReceiver = function(req, res, next) {
    if (req.xhr === false) {
        return;
    }
    var user = req.session.user;
    var id = req.body.id;
    var receiver = {
        recvAddressId:req.body.id,
        memberId: user.memberId,
        recvLinkman: req.body.consignee,
        idCard: req.body.idCard,
        recvMobile: req.body.mobileNumber,
        areaCode: req.body.districtCode,
        address: req.body.address,
        isDefault:req.body.isDefault
    }
    var validResult = receiverValidator(_.extend(receiver,{
        provinceCode:req.body.provinceCode,
        cityCode:req.body.cityCode
    }))
    if(validResult.isValid === false){
        res.json({
            receiverSaved:false,
            errMsg:validResult.errMsg
        })
    }else{
        util.fetchAPI("updateReceiver", receiver).then(function(resp) {
            if (resp.returnCode === 0) {
                res.json({
                    receiverSaved: true
                })
            } else {
                res.json({
                    receiverSaved: false,
                    errMsg: resp.message
                })
            }
        })
    }
}

function receiverValidator(receiver){
    let isValid = true
    let errMsg = null
    if(receiver.recvLinkman){
        if(/\w{2,10}/g.test(receiver.recvLinkman) === false){
            // return {isValid:false,errMsg:"姓名不合法"}
        }
    }else{
        return {isValid:false,errMsg:"姓名不能为空"}
    }
    if(receiver.idCard){
        if(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/g.test(receiver.idCard) === false){
            return {isValid:false,errMsg:"身份证不合法"}
        }
    }else{
        return {isValid:false,errMsg:"身份证不能为空"}
    }
    if(receiver.recvMobile){
        if(/^1[3|4|5|7|8]\d{9}$/g.test(receiver.recvMobile) === false){
            return {isValid:false,errMsg:"手机号码不合法"}
        }
    }else{
        return {isValid:false,errMsg:"手机号码不能为空"}
    }
    if(!receiver.provinceCode){
        return {isValid:false,errMsg:"省份不能为空"}
    }
    if(!receiver.cityCode){
        return {isValid:false,errMsg:"城市不能为空"}
    }
    if(!receiver.areaCode){
        return {isValid:false,errMsg:"区县不能为空"}
    }
    if(!receiver.address){
        return {isValid:false,errMsg:"详细地址不能为空"}
    }
    return {isValid,errMsg}
}

var createReceiver = function(req, res, next) {
    var user = req.session.user
    var receiver = {
        memberId: user.memberId,
        recvLinkman: req.body.consignee,
        idCard: req.body.idCard,
        recvMobile: req.body.mobileNumber,
        areaCode: req.body.districtCode,
        address: req.body.address,
        isDefault:req.body.isDefault
    }
    var validResult = receiverValidator(_.extend(receiver,{
        provinceCode:req.body.provinceCode,
        cityCode:req.body.cityCode
    }))
    if(validResult.isValid === false){
        res.json({
            receiverSaved:false,
            errMsg:validResult.errMsg
        })
    }else{
        util.fetchAPI("addReceiver", receiver, false).then(function(resp) {
            if (resp.returnCode === 0) {
                res.json({
                    receiverSaved: true
                })
            } else {
                res.json({
                    receiverSaved: false,
                    errMsg: resp.message
                })
            }
        })
    }
}

var deleteReceiver = function(req,res,next){
    var user = req.session.user
    var id = req.body.id
    util.fetchAPI('deleteReceiver',{
        recvAddressId:id,
        memberId:user.memberId
    }).then(function(ret){
        if(ret.returnCode === 0){
            res.json({
                receiverDeleted:true
            })
        }else{
            res.json({
                receiverDeleted:false,
                errMsg:ret.msg
            })
        }
    })
}

var setDefaultReceiver = function(req,res,next){
    var user = req.session.user
    var id = req.body.id
    util.fetchAPI('setDefaultReceiver',{
        recvAddressId:id,
        memberId:user.memberId
    }).then(function(ret){
        if(ret.returnCode === 0){
            res.json({
                receiverUpdated:true
            })
        }else{
            res.json({
                receiverUpdated:false,
                errMsg:ret.message
            })
        }
    },function(){
        res.json({
            receiverUpdated:false,
            errMsg:"api request failed"
        })
    })
}

var cascadeArea = function(req, res) {
    if (req.xhr !== true) {
        return;
    }
    var api = req.query.api;
    var code = req.query.code ? req.query.code : '';
    util.fetchAPI(api, {
        code: code, //CATALOG_REGION 查询省
    }, false).then(function(resp) {
        if (resp.returnCode === 0) {
            var items = [];
            _.each(resp.areaList, function(v, k) {
                items.push({
                    label: v,
                    value: k
                })
            });
            res.json({
                isFetched: true,
                items: items
            });
        } else {
            res.json({
                isFetched: false,
                errMsg: resp.msg
            })
        }
    }).fail(function(resp) {
        console.log(resp)
    })
}

module.exports = {
    receiver: receiver,
    addReceiver: addReceiver,
    receiverById: receiverById,
    receiverByUser: receiverByUser,
    saveReceiver: saveReceiver,
    createReceiver: createReceiver,
    deleteReceiver:deleteReceiver,
    setDefaultReceiver:setDefaultReceiver,
    cascadeArea: cascadeArea,
    receiversFilter:receiversFilter
};
