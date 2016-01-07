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
        addressId:id
    },false).then(function(resp) {
        if (resp.code === "success") {
            var address = resp.object;
            var receiver = {
                id: address.id,
                consignee: address.name,
                mobile: address.mobileNumber,
                zipcode: address.zipcode,
                address: address.address,
                province: address.provinceCode,
                city: address.cityCode,
                district: address.districtCode,
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
                isDefault: address.defaultChecked === 1
            };
            var initialState = {
                isFetched: true,
                receiver: receiver,
            };
            res.json(initialState);
        } else {
            next(new Error(resp.msg));
        }
    })
}

var saveReceiver = function(req, res, next) {
    if (req.xhr === false) {
        return;
    }
    var user = req.session.user;
    var id = req.body.id;
    var receiver = {
        memberId: user.memberId,
        name: req.body.consignee,
        provinceCode: req.body.provincecode,
        provinceName: req.body.province,
        cityName: req.body.city,
        cityCode: req.body.citycode,
        districtName: req.body.district,
        districtCode: req.body.districtcode,
        address: req.body.address,
        zipcode: req.body.zipcode,
        mobileNumber: req.body.mobile,
        defaultChecked: req.body.isdefault == "true"?1:0
    }
    if (id !== "") {
        receiver = _.extend(receiver, {
            addressId: req.body.id
        })
        // console.log('update receiver', receiver)
        util.fetchAPI(config.api.updateReceiver.url, receiver).then(function(resp) {
            if(resp.code === "success"){
                res.json({
                    receiverSaved:true
                })
            }else{
                res.json({
                    receiverSaved:false,
                    errMsg:resp.msg
                })
            }
        })
    } else {
        util.fetchAPI(config.api.addReceiver.url, receiver).then(function(resp) {
            // console.log('resp', resp)
            if(resp.code === "success"){
                res.json({
                    receiverSaved:true
                })
            }else{
                res.json({
                    receiverSaved:false,
                    errMsg:resp.msg
                })
            }
        })
    }
}

var cascadeArea = function(req, res) {
    console.log(req.xhr)
    if (req.xhr !== true) {
        return;
    }
    var isProvince = req.query.isprovince;
    var code = req.query.code ? req.query.code : '';
    // if(isProvince === "true"){
    //     code = "CATALOG_REGION";
    // }
    util.fetchAPI("cascadeArea", {
        code: code, //CATALOG_REGION 查询省
        // isProvice: isProvince
    },false).then(function(resp) {
        console.log(resp)
        if (resp.code === "success") {
            var items = [];
            _.each(resp.dictionaryList, function(v, k) {
                items.push({
                    label: v.name,
                    value: v.code
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