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
        return (
            <div className="indexSingle">
                <div className="title">
                    <span><i></i>单品推荐</span>
                </div>
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic15.gif" />
                    <span className="name">阿瓦隆B群防脱洗发水414ml</span>
                    <p>拯救你的“纤细稀薄”秀发！“治愈性”洗发水，不只是清洁防脱，更能促进毛囊生长、增加发量！生物素+锯棕榈，解决稀疏问题！无硅、无SLS起泡剂。</p>
                    <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰直采</span>
                    <span className="singlePrice">
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </span>
                </a>
                <a href="/gooddetail/2" className="clearfix">
                    <img src="/client/asset/images/pic16.gif" />
                    <span className="name">阿瓦隆B群防脱洗发水414ml</span>
                    <p>拯救你的“纤细稀薄”秀发！“治愈性”洗发水，不只是清洁防脱，更能促进毛囊生长、增加发量！生物素+锯棕榈，解决稀疏问题！无硅、无SLS起泡剂。</p>
                    <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰直采</span>
                    <span className="singlePrice">
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </span>
                </a>
            </div>
        )
    }
    renderNewRecommend(){
        return (
            <div className="activityGeneral">
                <div className="title">
                    <span><i></i>新品推荐</span>
                </div>
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic21.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
                <a href="/gooddetail/2" className="clearfix">
                    <img src="/client/asset/images/pic21.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
            </div>
        )   
    }
    renderSlider(){
        return (
            <Slider ref="slider" autoPlay={true}>
                <Slide>
                    <a href="/activity">
                        <img src="/client/asset/images/banner.gif" alt=""/>
                    </a>
                </Slide>
                <Slide>
                    <a href="/activity">
                        <img src="/client/asset/images/banner.gif" alt=""/>
                    </a>
                </Slide>
                <Slide>
                    <a href="/activity">
                        <img src="/client/asset/images/banner.gif" alt=""/>
                    </a>
                </Slide>
            </Slider>
        )
    }
    componentDidUpdate(){
        if(this.props.redraw === true){
            let sliderNode = ReactDOM.findDOMNode(this)
            // console.log(sliderNode.parentNode.offsetWidth)
            // this.refs["slider"].initialize({
            //     width:sliderNode.parentNode.offsetWidth
            // })
            // this.refs["slider"].play()
        }
    }
    render(){
        return (
            <div className="floor-content" onTouchMove={(e)=>{
                // console.log('floor scroll')
                // e && e.stopPropagation()
            }}>
                {this.renderSlider()}
                <div className="m-entry">
                    <span>精选特卖</span>
                    <span>热销排行</span>
                    <span>正品保障</span>
                    <span>新人福利</span>
                </div>
                <div className="panic">
                    <a href="/activity">
                        <img src="/client/asset/images/pic1.gif" />
                        <span><i><img src="/client/asset/images/flashClock.png" alt="" /></i>距本期活动结束：01天34时10分46秒</span>
                    </a>
                    <a href="/activity">
                        <img src="/client/asset/images/pic2.gif" />
                        <span><i><img src="/client/asset/images/flashClock.png" alt="" /></i>距本期活动结束：01天34时10分46秒</span>
                    </a>
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
                    <a href="/gooddetail/1" className="clearfix">
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
                {this.renderSingleRecommend()}
                {this.renderNewRecommend()}
            </div>
        )
    }
}

export default Floor;