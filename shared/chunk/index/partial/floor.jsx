'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import _ from "../../../lib/lodash.es6";
import {Slides,Slide} from "../../../component/slides.jsx";
import Refresher from "../../../component/refresher.jsx";
import GoTop from "../../../component/gotop.jsx";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
import Loading from "../../common/loading.jsx";
import dom from "../../../lib/dom.es6";
import {jumpURL} from "../../../lib/jumpurl.es6";

import Timer from "../../common/timer.jsx";
import {formatPrice,destPriceForGoods} from "../../../lib/helper.es6";

class Floor extends Component{
    constructor(props){
        super(props);
        this.smooth = false
    }
    componentDidMount(){
        if(this.props.active){
            this.handleActive(this.props.channel)
            if(this.props.nextChannel){
                // this.props.fetchChannel({
                //     id:this.props.nextChannel.id
                // })
            }
        }
    }
    updateFlashbuyGoods(channel){
        let {flashbuys} = channel.floors;
        let ids = []
        if(flashbuys){
            flashbuys.forEach((flashbuy)=>{
                flashbuy.goods.forEach((good)=>{
                    ids.push(good.singleCode)
                })
            })
        }
        // console.log(ids)
        this.props.updateGoods({ids:ids.join(",")},"flashbuys",channel.id)
    }
    componentDidUpdate(prevProps){
        if(this.props.active && !prevProps.active){
            if(_.isEmpty(this.props.channel.floors)){
                const {fetchChannel,channel} = this.props
                fetchChannel({
                    id:channel.id
                })
            }
            if(this.props.nextChannel){
                if(_.isEmpty(this.props.nextChannel.floors)){
                    // alert('fetch nextChannel'+this.props.nextChannel.name)
                    // this.props.fetchChannel({
                    //     id:this.props.nextChannel.id
                    // })
                }
            }
        }
        if(this.props.channelFetched && !prevProps.channelFetched){
                this.handleActive(channel)
        }
    }
    handleActive(channel){
        // console.log('channel',channel)
        // const {fetchSingleRecommend,fetchNewRecommend} = this.props;
        const {fetchNewRecommend,fetchSingleRecommend} = this.props;
        const {newRecommend,singleRecommend} = channel.floors
        if(newRecommend && newRecommend.goods === null){
            // fetchNewRecommend({activityId:newRecommend.id},this.props.channel.id)
        }
        if(singleRecommend && singleRecommend.goods === null){
            fetchSingleRecommend({activityId:singleRecommend.id,pageIndex:1},channel.id)
        }
        this.updateFlashbuyGoods(channel)
    }
    beginRefresh(channel){
        const {fetchSingleRecommend,fetchNewRecommend} = this.props
        const {newRecommend,singleRecommend} = channel.floors
        if(channel.singleRecommendFetching || channel.newRecommendFetching){
            return false
        }
        // console.log('singleRecommend',singleRecommend,newRecommend)
        if(singleRecommend === undefined){
            if(newRecommend && newRecommend.pageIndex === undefined){
                fetchNewRecommend({activityId:newRecommend.id,pageIndex:1},channel.id)
            }
        }else if(singleRecommend.pageIndex == singleRecommend.totalPage){
            if(newRecommend && newRecommend.pageIndex === undefined){
                fetchNewRecommend({activityId:newRecommend.id,pageIndex:1},channel.id)
            }
        }else if(singleRecommend.pageIndex < singleRecommend.totalPage){
            fetchSingleRecommend({
                activityId:singleRecommend.id,
                pageIndex:singleRecommend.pageIndex + 1
            },channel.id)
        }
        if(newRecommend === undefined || newRecommend.pageIndex === newRecommend.totalPage){
            return false
        }else if(newRecommend.pageIndex < newRecommend.totalPage){
            fetchNewRecommend({
                activityId:newRecommend.id,
                pageIndex:newRecommend.pageIndex + 1
            },channel.id)
        }
    }
    handleScroll(scrollNode,scrollTop){
        if(this.smooth){
            if(scrollNode.clientHeight + scrollTop - 30 >= scrollNode.children[0].clientHeight){
                this.beginRefresh(this.props.channel)
            }
        }else{
            if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
                this.beginRefresh(this.props.channel)
            }
        }
    }
    renderSingleRecommend(){
        let {singleRecommend} = this.props.channel.floors;
        if(singleRecommend && singleRecommend.goods && singleRecommend.goods.length > 0){
            let goods = singleRecommend.goods.map((good,i)=>{
                let destPrice = destPriceForGoods(good).destPrice
                const saleState = classNames({
                    "sale-out":good.stock === 0,
                    "put-off":good.isOff === true
                });
                return (
                    <a href={jumpURL("gooddetail",[good.singleCode])} className="clearfix" key={i}>
                        <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={good.imageUrl} 
                        transitionName="fade" placeholder={()=><div className="single-recommend-placeholder"></div>}
                        >
                        <div className={saleState}></div>
                        </Image>
                        </LazyLoad>
                        <span className="name">{good.title}</span>
                        <p>{good.subTitle}</p>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png"/></i>荷兰直采</span>
                        <span className="singlePrice">
                            <span className="nowPrice">&yen;{formatPrice(destPrice)}</span>
                            <span className="oldPrice">&yen;{formatPrice(good.originPrice)}</span>
                        </span>
                    </a>
                )
            })
            return (
                <div className="indexSingle">
                    <div className="title">
                        <span><i></i>单品推荐</span>
                    </div>
                    {goods}
                </div>
            )
        }
        return null
    }
    renderNewRecommend(){
        let {newRecommend} = this.props.channel.floors;
        if(newRecommend && newRecommend.goods && newRecommend.goods.length > 0){
            let goods = newRecommend.goods.map((good,i)=>{
                let destPrice = destPriceForGoods(good).destPrice
                const saleState = classNames({
                    "sale-out":good.stock === 0,
                    "put-off":good.isOff === true
                });
                return (
                    <a href={jumpURL("gooddetail",[good.singleCode])} className="clearfix" key={i}>
                        <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={good.imageUrl} 
                        transitionName="fade" placeholder={()=><div className="new-recommend-placeholder"></div>}
                        >
                        <div className={saleState}></div>
                        </Image>
                        </LazyLoad>
                        <div className="right">
                            <span className="name">{good.title}</span>
                            <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                            <span className="nowPrice">&yen;{formatPrice(destPrice)}</span>
                            <span className="oldPrice">&yen;{formatPrice(good.originPrice)}</span>
                        </div>
                    </a>
                )   
            })
            return (
                <div className="activityGeneral">
                    <div className="title">
                        <span><i></i>新品推荐</span>
                    </div>
                    {goods}
                </div>
            )
        }
        return null
    }
    renderSlider(){
        let {slides} = this.props.channel.floors;
        if(slides && slides.length > 0){
            slides = slides.map((slide,i)=>{
                return (
                    <Slide key={i}>
                        <a href={slide.jumpUrl}>
                            <img src={slide.imageUrl} alt=""/>
                        </a>
                    </Slide>
                )
            })
            return (
                <Slides ref="slider" autoPlay={true} touchEnabled={false} effect="fade">
                {slides}
                </Slides>
            )
        }
        return null
    }
    renderBadges(){
        let {badges} = this.props.channel.floors;
        if(badges && badges.length > 0){
            badges = badges.map((badge,i)=>{
                return <a href={badge.jumpUrl} key={i}><span><img src={badge.imageUrl}/><p>{badge.title}</p></span></a>
            })
            return <div className="m-entry">{badges}</div>
        }
        return null
    }
    renderRushBuy(){
        let {rushbuys} = this.props.channel.floors;
        if(rushbuys){
            return rushbuys.map((rushbuy,i)=>{
                let timer = (
                    <span><i><img src="/client/asset/images/flashClock.png" />
                    </i>距本期活动结束：<Timer endTime={rushbuy.endTime} dayEnable={true} 
                        template="<%= day %>天<%= hour %>时<%= minute %>分<%= second %>秒"/>
                    </span>
                )
                if(rushbuy.status === -1){
                    timer = (
                    <span><i><img src="/client/asset/images/flashClock.png" />
                    </i>距本期活动开始：<Timer endTime={rushbuy.startTime} dayEnable={true} 
                        template="<%= day %>天<%= hour %>时<%= minute %>分<%= second %>秒"/>
                    </span>
                    )
                }else if(rushbuy.status === 1){
                    timer = (
                    <span><i><img src="/client/asset/images/flashClock.png" />
                    </i>活动已结束</span>
                    )
                    return null
                }
                return <a href={rushbuy.jumpUrl} key={i}>
                    <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                    <Image src={rushbuy.imageUrl} 
                    transitionName="fade" placeholder={()=><div className="new-recommend-placeholder"></div>}
                    >
                    </Image>
                    </LazyLoad>
                    {timer}
                </a>
            })
        }
        return null
    }
    renderFlashBuy(){
        let {flashbuys,flashbuyId} = this.props.channel.floors;
        if(flashbuys){
            let goods = null;
            flashbuys = flashbuys.forEach((flashbuy,i)=>{
                if(flashbuy.active){
                    goods = flashbuy.goods.map((good,i)=>{
                        let timer = (
                            <p>距本期闪购结束<em>
                            <Timer endTime={good.endTime} dayEnable={true} 
                            template="<i><%= day %></i>天<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/>
                            </em></p>
                        )
                        if(good.status === -1){
                            timer = <p>距本期闪购开始<em>
                            <Timer endTime={good.startTime} dayEnable={true} 
                            template="<i><%= day %></i>天<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/>
                            </em></p>
                        }else if(good.status === 1){
                            timer = <p>本期闪购已结束</p>
                        }
                        let salePrice = good.salesPrice
                        if(good.isFlashbuyActive){
                            salePrice = good.flashPrice
                        }else if(good.mobilePrice){
                            salePrice = good.mobilePrice
                        }
                        const saleState = classNames({
                            "sale-out":good.stock === 0,
                            "put-off":good.isOff === true
                        });
                        return (
                        <a href={jumpURL("gooddetail",[good.singleCode])} className="clearfix" key={i}>
                            <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                            <Image src={good.imageUrl} 
                            transitionName="fade" placeholder={()=><div className="flashbuy-placeholder"></div>}
                            >
                            <div className={saleState}></div>
                            </Image>
                            </LazyLoad>
                            <div className="right">
                                {timer}
                                <div className="flashDot"></div>
                                <span className="name">{good.title}</span>
                                <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                                <span className="nowPrice">&yen;{formatPrice(salePrice)}</span>
                                <span className="oldPrice">&yen;{formatPrice(good.originPrice)}</span>
                            </div>
                        </a>
                        )
                    })
                }
            })
            return (
                <div className="flashBuy">
                    <div className="title">
                        <span><i></i>闪购精选</span>
                        <a href={jumpURL("flashbuy",[flashbuyId])}>更多<i><img src="/client/asset/images/ico_more.png" /></i></a>
                    </div>
                    {goods}
                </div>
            )
        }
        return null
    }
    renderActivityOne(){
        let {activityOne} = this.props.channel.floors;
        if(activityOne && activityOne.length > 0){
            return (
                <div className="activity">
                <ul className="clearfix">
                    <li>
                        <a href={activityOne[0].jumpUrl}>
                            <img src={activityOne[0].imageUrl} alt="" />
                            <span></span>
                        </a>
                    </li>
                    <li>
                        {activityOne[1]?(
                        <a href={activityOne[1].jumpUrl}>
                            <img src={activityOne[1].imageUrl} alt="" />
                            <span></span>
                        </a>
                        ):null}
                        {activityOne[2]?(
                        <a href={activityOne[2].jumpUrl}>
                            <img src={activityOne[2].imageUrl} alt="" />
                            <span></span>
                        </a>
                        ):null}
                    </li>
                </ul>
                </div>
            )
        }
        return null
    }
    renderActivityTwo(){
        let {activityTwo} = this.props.channel.floors;
        if(activityTwo){
            return activityTwo.map((activity,i)=>{
                return (
                    <li key={i}>
                        <a href={activity.jumpUrl}>
                        <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={activity.imageUrl} 
                        transitionName="fade" placeholder={()=><div className="ActivityTwo-placeholder"></div>}
                        >
                        </Image>
                        </LazyLoad>
                        </a>
                    </li>
                )
            })
        }
        return null
    }
    renderActivityThree(){
        let {activityThree} = this.props.channel.floors;
        if(activityThree && activityThree.length > 0){
            return (
                <ul className="clearfix">
                    <li>
                        <a href={activityThree[0].jumpUrl}>
                            <img src={activityThree[0].imageUrl} alt="" />
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <div className="clearfix">
                        {activityThree[1]?(
                        <a href={activityThree[1].jumpUrl}>
                            <img src={activityThree[1].imageUrl} alt=""/>
                        </a>):null}
                        {activityThree[2]?(
                        <a href={activityThree[2].jumpUrl}>
                            <img src={activityThree[2].imageUrl} alt=""/>
                        </a>):null}
                        </div>
                        {activityThree[3]?(
                        <a href={activityThree[3].jumpUrl}>
                            <img src={activityThree[3].imageUrl} alt=""/>
                        </a>):null}
                    </li>
                </ul>
            )
        }
        return null
    }
    render(){
        const {channel} = this.props;
        let {channelFetching}  = channel
        if(!this.props.active && _.isEmpty(channel.floors)){
            channelFetching = channelFetching || true
        }
        const {singleRecommend,newRecommend} = channel.floors
        let isNoMore = false
        if(singleRecommend === undefined && newRecommend){
            if(newRecommend.pageIndex !== undefined ){
                if(newRecommend.pageIndex == newRecommend.totalPage){
                    isNoMore = true
                }
            }
        }
        if(singleRecommend && newRecommend){
            if(newRecommend.pageIndex !== undefined ){
                if(singleRecommend.pageIndex == singleRecommend.totalPage && newRecommend.pageIndex == newRecommend.totalPage){
                    isNoMore = true
                }
            }
        }
        return (
            <GoTop relative={true} smooth={this.smooth} onScroll={this.handleScroll.bind(this)}>
            <div className="floor-content">
                {this.renderSlider()}
                {this.renderBadges()}
                <div className="panic">
                {this.renderRushBuy()}
                </div>
                {this.renderActivityOne()}
                <div className="activity_2">
                    <ul className="clearfix">{this.renderActivityTwo()}</ul>
                </div>
                {this.renderFlashBuy()}
                <div className="activity_3">{this.renderActivityThree()}</div>
                {this.renderSingleRecommend()}
                {this.renderNewRecommend()}
                <Refresher active={channel.singleRecommendFetching || channel.newRecommendFetching}/>
                {isNoMore?
                    (<div className="no-more">已显示全部内容</div>):null}
            </div>
            {this.props.index !== 0?<Loading active={channelFetching}/>:null}
            </GoTop>
        )
    }
}

export default Floor;