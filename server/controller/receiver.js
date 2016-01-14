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

function receiversFilter(receivers) {
    var _receivers = []
    _.each(receivers, function(receiver) {
        var _receiver = receiverFilter(receiver)
        _receiver["id"] = receiver.recvAddressId
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

var updateReceiver = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;
    util.fetchAPI("receiverById", {
        memberId: user.memberId,
        recvAddressId: id
    }, false).then(function(resp) {
        if (resp.returnCode === 0) {
            var receiver = receiverFilter(resp.object);
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

function receiverFilter(receiver) {
    var _receiver = _.pick(receiver, [
        "cityCode", "cityName",
        "provinceCode", "provinceName", "isDefault", "idCard", "address", "zipcode"
    ]);
    _receiver["districtCode"] = receiver["countyCode"]
    _receiver["districtName"] = receiver["countyName"]
    _receiver["id"] = receiver["recvAddressId"]
    _receiver["consignee"] = receiver["recvLinkman"]
    _receiver["mobileNumber"] = receiver["recvMobile"]
    _receiver["isDefault"] = (receiver["isDefault"] === 1)
    return _receiver
}

var saveReceiver = function(req, res, next) {
    if (req.xhr === false) {
        return;
    }
    var user = req.session.user;
    var id = req.body.id;
    var receiver = {
        id:req.body.id,
        memberId: user.memberId,
        recvLinkman: req.body.consignee,
        idCard: req.body.idCard,
        recvMobile: req.body.mobileNumber,
        areaCode: req.body.districtCode,
        address: req.body.address,
        defaultChecked: req.body.isdefault == "true" ? 1 : 0
    }
        // console.log('update receiver', receiver)
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

var createReceiver = function(req, res, next) {
    var user = req.session.user
    var receiver = {
        memberId: user.memberId,
        recvLinkman: req.body.consignee,
        idCard: req.body.idCard,
        recvMobile: req.body.mobileNumber,
        areaCode: req.body.districtCode,
        address: req.body.address,
        defaultChecked: req.body.isdefault == "true" ? 1 : 0
    }
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
    updateReceiver: updateReceiver,
    saveReceiver: saveReceiver,
    cascadeArea: cascadeArea
};
