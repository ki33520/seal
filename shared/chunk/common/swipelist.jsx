'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Slides,Slide} from "../../component/slides.jsx";

class Swipelist extends Component{
    render(){
        var {imgList,activeIndex,canBack,onGoBack,slidesIndex,swiperPagination} = this.props;
        if(imgList && imgList.length>0){
            var slides = imgList.map((v,k)=>{
                var t = k+1+" / "+imgList.length;
                const key = "slide-" + k;
                return (
                    <Slide key={k}>
                        <div className="slide-header">
                            <b>{t}</b>
                        </div>
                        <div className="img-wrap"><img key={Math.random()} src={v} /></div>
                    </Slide>
                );
            })
            return (
                <div className="swipe-list">
                    <a href="javascript:void(null)" onClick={onGoBack} className="iconfont icon-back"></a>
                    <Slides effect="roll" slidesIndex={slidesIndex} swiperPagination={swiperPagination} initialSlide={activeIndex} autoPlay={false} loop={true} speed={200}>{slides}</Slides>
                </div>
            )
        }
        return null;
    }
}

Swipelist.defaultProps = {
    slidesIndex: 0,
    activeIndex: 0,
    canBack:true,
    onGoBack:function(e){
        e.preventDefault();
        window.history.back();
    }
}

export default Swipelist;