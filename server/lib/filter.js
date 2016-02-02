'use strict';
var config = require("./config.js");
var moment = require("moment");

var filter = {
	price : function(item){
		if(item.startTime && item.endTime){
			var startDate = moment(new Date(item.startTime)).format("YYYY-MM-DD HH:mm:ss");
			var endDate = moment(new Date(item.endTime)).format("YYYY-MM-DD HH:mm:ss");
			if(moment().isBetween(startDate,endDate)){
            	return item.flashPrice;
			}
		}  
        if(item.mobilePrice > 0){
        	return item.mobilePrice;
        }
        return item.salesPrice;
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