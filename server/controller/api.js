'use strict'
var _ = require("lodash");
var fse = require("fs-extra");
var path = require("path");
var md5 = require("md5");
var config = require("../lib/config");
var util = require("../lib/util");
var Index = util.getSharedComponent("index");
var floorFilter = require("./index").floorFilter;

var buildIndexPage = function(req, res, next) {
    var channelId = req.query.channelId
    util.fetchAPI("indexChannels", {
        channel: "Mobile"
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var channels = ret.object;
            channels = _.map(channels, function(channel) {
                return {
                    id: channel.id,
                    sort: channel.sort,
                    name: channel.manageName,
                    floors: {}
                }
            })
            channels = _.sortBy(channels, function(channel) {
                return channel.sort
            })
            return channels
        } else {
            res.json({
                returnCode: -1,
                message: channelId + "生成失败!"
            })
        }
    }).then(function(channels) {
        if (channels && channels.length > 0) {
            var channelIndex = _.findIndex(channels, {
                id: channelId
            })
            util.fetchAPI("floorsByChannel", {
                channel: "Mobile",
                manageId: channelId,
                start: 0,
                limit: 3
            }).then(function(ret) {
                if (ret.returnCode === 0) {
                    channels[channelIndex].floors = floorFilter(ret.object)
                    var initialState = {
                        activeIndex: channelIndex,
                        channels: channels
                    };
                    var markup = util.getMarkupByComponent(Index({
                        initialState: initialState
                    }));
                    res.render("index", {
                        markup: markup,
                        initialState: initialState
                    }, function(err, html) {
                        var pageName = "index-"+md5(channelId)
                        util.writePage(pageName, html)
                        res.json({
                            returnCode: 0,
                            url:"/client/page/"+pageName+".html",
                            message: channelId + "生成成功!"
                        })
                    });
                } else {
                    res.json({
                        returnCode: -1,
                        message: channelId + "生成失败!"
                    })
                }
            })
        }
    })
};

var publishIndexPage = function(req, res, next) {
    var channelId = req.query.channelId
    var pageName = "index-"+md5(channelId)
    fse.copy(path.resolve("client/page/"+pageName+".html"),
        path.resolve("client/page/index.html"),function(err){
            if(err){
                res.json({
                    returnCode:-1,
                    message:channelId+"发布失败!"
                })
            }else{
                res.json({
                    returnCode:0,
                    message:channelId+"发布成功!"
                })
            }
    })
}

module.exports = {
    buildIndexPage:buildIndexPage,
    publishIndexPage:publishIndexPage
} 
