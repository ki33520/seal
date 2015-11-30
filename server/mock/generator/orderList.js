'use strict';
var faker = require("faker");

var orderList = {
    "msg": "查询商品列表页成功",
    "code": "success",
    "time": Date.now(),
    "page":{
        "totalCount":6,
        "totalPage":1,
        "pageSize":6,
        "pageNo":1,
        "list":function(){
            var list = [];
            for (var i = 5; i <= 5; i++) {
                list.push({
                    id:i,
                    title:faker.commerce.productName,
                    standardPrice:faker.commerce.price,
                    salePrice:faker.commerce.price
                })
            };
        }
    }
}

module.exports = orderList;
