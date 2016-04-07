'use strict';
var faker = require("faker");

const orderStatus = [
    "STATUS_NOT_PAY",
    "STATUS_WAIT_CONFIRM",
    "STATUS_CONFIRMED",
    "STATUS_OUT_HOUSE",
    "STATUS_SENDED",
    "STATUS_FINISHED",
    "STATUS_CANCELED"
];

var orderList = {
    "msg": "查询订单列表页成功",
    "code": "success",
    "time": Date.now(),
    "page":{
        "totalCount":6,
        "totalPage":1,
        "pageSize":6,
        "pageNo":1,
        "list":function(){
            var list = [];
            for(var i = 0;i<= faker.random.number(5);i++){
                var goods = [];
                for (var j = 0; j <= faker.random.number(4); j++) {
                    goods.push({
                        id:i,
                        imageUrl:faker.image.food(300,300),
                        title:faker.commerce.productName(),
                        standardPrice:faker.commerce.price(),
                        salePrice:faker.commerce.price()
                    })
                };
                var order = {
                    id:j,
                    orderNo:faker.random.uuid(),
                    createdAt:faker.date.past().getTime(),
                    status:orderStatus[faker.random.number(7)],
                    finalFee:faker.commerce.price(),
                    goods:goods
                }
                list.push(order)
            }
            return list;
        }
    }
}

module.exports = orderList;
