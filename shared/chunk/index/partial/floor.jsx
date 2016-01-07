'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";

class Floor extends Component{
    constructor(props){
        super(props);
    }
    renderSingleRecommend(){
        let {singleRecommend} = this.props.floors;
        if(singleRecommend !== null){
            return singleRecommend.map((good,i)=>{
                return (
                    <a href="#" className="clearfix" key={i}>
                        <img src="/client/asset/images/pic21.gif" />
                        <span className="name">阿瓦隆B群防脱洗发水414ml</span>
                        <p>拯救你的“纤细稀薄”秀发！“治愈性”洗发水，不只是清洁防脱，更能促进毛囊生长、增加发量！生物素+锯棕榈，解决稀疏问题！无硅、无SLS起泡剂。</p>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png"/></i>荷兰直采</span>
                        <span className="singlePrice">
                            <span className="nowPrice">&yen;99.0</span>
                            <span className="oldPrice">&yen;199.0</span>
                        </span>
                    </a>
                )
            })
        }
        return null
    }
    renderNewRecommend(){
        let {newRecommend} = this.props.floors;
        if(newRecommend !== null){
            return newRecommend.map((good,i)=>{
                return (
                    <a href="/gooddetail/1" className="clearfix" key={i}>
                        <img src="/client/asset/images/pic21.gif" />
                        <div className="right">
                            <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                            <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                            <span className="nowPrice">&yen;99.0</span>
                            <span className="oldPrice">&yen;199.0</span>
                        </div>
                    </a>
                )   
            })
        }
    }
    renderSlider(){
        let {slides} = this.props.floors;
        if(slides){
            slides = slides.map((slide,i)=>{
                return (
                    <Slide key={i}>
                        <a href="/activity">
                            <img src={slide.imageUrl} alt=""/>
                        </a>
                    </Slide>
                )
            })
            return (
                <Slider ref="slider" autoPlay={true} touchEnabled={false} effect="fade">
                {slides}
                </Slider>
            )
        }
        return null
    }
    renderBadges(){
        let {badges} = this.props.floors;
        return badges.map((badge,i)=>{
            return <span key={i}>{badge.title}</span>
        })
    }
    renderRushBuy(){
        let {rushbuys} = this.props.floors;
        if(rushbuys === null){
            return null
        }
        return rushbuys.map((rushbuy,i)=>{
            return <a href="/activity" key={i}>
                <img src={rushbuy.imageUrl} />
                <span><i><img src="/client/asset/images/flashClock.png" /></i>距本期活动结束：01天34时10分46秒</span>
            </a>
        })
    }
    renderFlashBuy(){
        let {flashbuys} = this.props.floors;
        if(flashbuys === null){
            return null
        }
        return flashbuys.map((flushbuy,i)=>{
            return (
            <a href="/gooddetail/1" className="clearfix" key={i}>
                <img src="/client/asset/images/pic8.gif" />
                <div className="right">
                    <p>距本期闪购结束<em><i>01</i>天<i>34</i>时<i>10分</i><i>46秒</i></em></p>
                    <div className="flashDot"></div>
                    <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                    <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                    <span className="nowPrice">&yen;99.0</span>
                    <span className="oldPrice">&yen;199.0</span>
                </div>
            </a>
            )
        })
    }
    render(){
        return (
            <div className="floor-content">
                {this.renderSlider()}
                <div className="m-entry">
                {this.renderBadges()}
                </div>
                <div className="panic">
                {this.renderRushBuy()}
                </div>
                <div className="activity">
                    <ul className="clearfix">
                        <li>
                            <a href="/mobileonly">
                                <img src="/client/asset/images/pic3.gif" alt="" />
                                <span></span>
                            </a>
                        </li>
                        <li>
                            <a href="/finest">
                                <img src="/client/asset/images/pic4.gif" alt="" />
                                <span></span>
                            </a>
                            <a href="/stockup">
                                <img src="/client/asset/images/pic5.gif" alt="" />
                                <span></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="activity_2">
                    <ul className="clearfix">
                        <li>
                            <a href="/activity">
                                <img src="/client/asset/images/pic6.gif" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="/activity">
                                <img src="/client/asset/images/pic7.gif" alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flashBuy">
                    <div className="title">
                        <span><i></i>闪购精选</span>
                        <a href="/flashbuy">更多<i><img src="/client/asset/images/ico_more.png" /></i></a>
                    </div>
                    {this.renderFlashBuy()}
                </div>
                <div className="activity_3">
                    <ul className="clearfix">
                        <li>
                            <a href="/activity">
                                <img src="/client/asset/images/pic11.gif" alt="" />
                            </a>
                        </li>
                        <li>
                            <div className="clearfix">
                                <a href="/activity">
                                    <img src="/client/asset/images/pic12.gif" alt="" />
                                </a>
                                <a href="/activity">
                                    <img src="/client/asset/images/pic13.gif" alt="" />
                                </a>
                            </div>
                            <a href="/activity">
                                <img src="/client/asset/images/pic14.gif" alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="indexSingle">
                    <div className="title">
                        <span><i></i>单品推荐</span>
                    </div>
                    {this.renderSingleRecommend()}
                </div>
                <div className="activityGeneral">
                    <div className="title">
                        <span><i></i>新品推荐</span>
                    </div>
                    {this.renderNewRecommend()}
                </div>
            </div>
        )
    }
}

export default Floor;