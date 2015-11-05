'use strict';

var React = require("react");
var _ = require("lodash");
var ReactDOMServer = require("react-dom/server");
var util = require("../../shared/lib/util.es6");
var config = require("../lib/config");
var bluebird = require("bluebird");
var GoodDetailApp = React.createFactory(require("../../shared/gooddetail/app.jsx"));

var goodDetail = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;

    bluebird.props({
        goodById: util.apiRequest(config.api.goodById.url, {
            productId: id
        })
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
            var markup = ReactDOMServer.renderToString(GoodDetailApp({initialState:initialState}));

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
