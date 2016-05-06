'use strict';

export function shareInWeixin(options = {}){
    const title = options.title || ""
    const link = options.link || ""
    const desc = options.desc || ""
    const imgUrl = options.desc || ""
    const success = options.success || ()=>{}
    const cancel = options.cancel || ()=>{}

    const debug = true
    const {appId,timeStamp,nonceStr,signature} = options
    const jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','hideMenuItems','addCard']

    if(!navigator){
        return
    }
    const isWeixin = (navigator.userAgent.toLowerCase().indexOf("micromessenger") > 1)
    if(!isWeixin){
        return
    }

    wx.config({
        debug,appId,timestamp:timeStamp,nonceStr,signature,jsApiList
    });

    wx.error(function(res){
        console.log("wx error",res)
    })
    wx.ready(()=>{
        console.log("wx success")
        wx.showOptionMenu()
        /*分享到朋友圈*/
        wx.onMenuShareTimeline({
            title,link,imgUrl,
            success:()=>success(),
            cancel:()=>cancel()
        });
        /*分享到朋友*/
        wx.onMenuShareAppMessage({
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            title,desc,link,imgUrl,
            success:()=>success(),
            cancel:()=>cancel()
        });
        /*分享到手机QQ*/
        wx.onMenuShareQQ({
            title,desc,link,imgUrl,
            success:()=>success(),
            cancel:()=>cancel()
        });
        /*分享到QQ空间*/
        wx.onMenuShareQZone({
            title,desc,link,imgUrl,
            success:()=>success(),
            cancel:()=>cancel()
        });
        /*分享到腾讯微博*/
        wx.onMenuShareWeibo({
            title,desc,link,imgUrl,
            success:()=>success(),
            cancel:()=>cancel()
        })
    })
}