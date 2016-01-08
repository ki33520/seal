'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var sharedUtil = require("../../shared/lib/util.es6");
var util = require("../lib/util");
var config = require("../lib/config");
var Receiver = util.getSharedComponent("receiver");

var receiver = function(req, res,next) {
    var user = req.session.user;
    util.fetchAPI("receiverByUser", {
        memberId: user.memberId
    },false).then(function(resp) {
            console.log(resp)
        if (resp.returnCode === 0) {
            var receivers = resp.object;
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
        }else{
            next(new Error(resp.message))
        }
    }).fail(function(resp){
        next(new Error("api response failed"))
    })
}

var addReceiver = function(req, res) {
    var initialState = {
        isFetched: true,
        receiver: {
            isDefault: true,
            provinces: [{
                value: "",
                label: "请选择"
            }],
            cities: [{
                value: "",
                label: "请选择"
            }],
            districts: [{
                value: "",
                label: "请选择"
            }]
        },
    };
    var markup = util.getMarkupByComponent(ReceiverForm({
        initialState: initialState
    }));
    res.render('receiverform', {
        markup: markup,
        initialState: initialState
    })

}

var updateReceiver = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;
    util.fetchAPI("receiverById", {
        memberId: user.memberId,
        recvAddressId:id
    },false).then(function(resp) {
            console.log(resp)
        if(resp.returnCode === 0){
            var address = resp.object;
            var receiver = {
                recvAddressId: address.recvAddressId,
                consignee: address.recvLinkman,
                mobile: address.recvMobile,
                idCard: address.idCard,
                zipcode: address.zipcode,
                address: address.address,
                province: address.provinceCode,
                city: address.cityCode,
                district: address.countyCode,
                provinces: [{
                    value: "",
                    label: "请选择"
                }],
                cities: [{
                    value: "",
                    label: "请选择"
                }],
                districts: [{
                    value: "",
                    label: "请选择"
                }],
                isDefault: address.isDefault === 1
            };
            var initialState = {
                isFetched: true,
                receiver: receiver,
            };
            res.json(initialState);
        } else {
            next(new Error(resp.message));
        }
    })
}

var saveReceiver = function(req, res, next) {
    console.log(req.xhr)
    if (req.xhr === false) {
        return;
    }
    var user = req.session.user;
    var recvAddressId = req.body.recvAddressId;
    var receiver = {
        memberId: user.memberId,
        recvLinkman: req.body.consignee,
        idCard: req.body.idCard,
        recvMobile: req.body.mobile,
        areaCode: req.body.districtcode,
        address: req.body.address,
        zipcode: req.body.zipcode,
        defaultChecked: req.body.isdefault == "true"?1:0
    }
    if (recvAddressId) {
        receiver = _.extend(receiver, {
            addressId: req.body.recvAddressId
        })
        // console.log('update receiver', receiver)
        util.fetchAPI("updateReceiver", receiver, false).then(function(resp) {
            console.log(resp)
            if(resp.returnCode === 0){
                res.json({
                    receiverSaved:true
                })
            }else{
                res.json({
                    receiverSaved:false,
                    errMsg:resp.message
                })
            }
        })
    } else {
        util.fetchAPI("addReceiver", receiver, false).then(function(resp) {
            console.log(resp)
            // console.log('resp', resp)
            if(resp.returnCode === 0){
                res.json({
                    receiverSaved:true
                })
            }else{
                res.json({
                    receiverSaved:false,
                    errMsg:resp.message
                })
            }
        })
    }
}

var cascadeArea = function(req, res) {
    if (req.xhr !== true) {
        return;
    }
    var findMapUrl = req.query.findMap;
    var code = req.query.code ? req.query.code : '';
    // if(isProvince === "true"){
    //     code = "CATALOG_REGION";
    // }
    util.fetchAPI(findMapUrl, {
        code: code, //CATALOG_REGION 查询省
        // isProvice: isProvince
    },false).then(function(resp) {
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
    }).fail(function(resp){
        console.log(resp)
    })
}

module.exports = {
    receiver: receiver,
    addReceiver:addReceiver,
    updateReceiver:updateReceiver,
    saveReceiver: saveReceiver,
    cascadeArea: cascadeArea
};