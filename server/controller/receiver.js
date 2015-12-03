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
    },true).then(function(resp) {
        if (resp.code === "success") {
            var receivers = resp.addressList;
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
            next(new Error(resp.msg))
        }
    }).fail(function(resp){
        next(new Error("api response failed"))
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
    if (req.xhr !== true) {
        return;
    }
    var isProvince = req.query.isprovince;
    var code = req.query.code;
    if(isProvince === "true"){
        code = "CATALOG_REGION";
    }
    util.fetchAPI("cascadeArea", {
        nodecode: code, //CATALOG_REGION 查询省
        // isProvice: isProvince
    },true).then(function(resp) {
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
    })
}

module.exports = {
    receiver: receiver,
    saveReceiver: saveReceiver,
    cascadeArea: cascadeArea
};