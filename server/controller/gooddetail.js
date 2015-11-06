'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var GoodDetailApp = util.getSharedComponent("gooddetail");

var goodDetail = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;

    bluebird.props({
        goodById: util.fetchAPI("goodById", {
            productId: id
        },true)
    }).then(function(ret) {
        if (ret.goodById.code === "success") {
            var good = ret.goodById.object;
            var properties = [];

            _.forIn(good.props, function(v, k) {
                    properties.push({
                        propertyName: k,
                        selectedValue: null,
                        propertyValues: [],
                    });
                })
            //fill specValue with item's propValues
            _.each(good.items, function(v) {
                    _.each(properties, function(property, k) {
                        properties[k].propertyValues.push({
                            value: v.props[property.propertyName],
                            disabled: false
                        });
                    })
                })
                //unique specValues and add status,selected property
            _.map(properties, function(v) {
                var propertyValues = _.uniq(v.propertyValues, function(propertyValue) {
                    return propertyValue.value;
                });
                v.propertyValues = propertyValues;
            });
            var slides = good.imageUrl.split(";");
            slides = slides.map(function(slide) {
                return slide.replace("imgtest.", "img.") + "@500w_500h_4e";
            })
            good.slides = slides;
            good.originalPrice = good.standardPrice;
            good.discount = (good.discount === "10.0") ? "" : good.discount + "折";
            good.properties = properties;
            good.stock = null;

            var cartCount = "";
            // if(resp.cartByUser !== false && resp.cartByUser.code === "ok"){
            //     cartCount = resp.cartByUser.page.totalCount > 0?
            //     serverUtil.calculateCart(resp.cartByUser):"";
            // }

            var initialState = {
                good: good,
                cartCount: cartCount
            };
            var markup = util.getMarkupByComponent(GoodDetailApp({initialState:initialState}));

            res.render('gooddetail', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    })
}

module.exports = goodDetail;
