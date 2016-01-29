'use strict';
var config = require("./config.js");

var filter = {
	price : function(goods){
		if(goods.flashPrice > 0){
			return goods.flashPrice;
		}
		if(goods.wapPrice > 0){
			return goods.wapPrice;
		}
		if(goods.mobilePrice){
			return goods.mobilePrice;
		}
		return goods.salesPrice;
	},
	imageUrl:function(path){
		return config.imgServer + path;
	},
	isSoldOut:function(stock){
		return stock > 0 ? false : true;
	},
	saleType:function(goods){
		if(goods.flashPrice>0||goods.wapPrice>0){
			return 'flash';
		}
		if(goods.mobilePrice>0){
			return 'mobile';
		}
	}
}
module.exports = filter;