'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

class Swipelist extends Component{
    componentDidUpdate(){
        var {imgList,activeIndex} = this.props;
        if(imgList && imgList.length >0){
            ReactDOM.findDOMNode(this.refs["swipelist"]).children[0].children[activeIndex].click();
        }
    }
    render(){
        var {imgList,activeIndex,canBack,onGoBack} = this.props;
        if(imgList){
            return (
                <div className="swipe-list">
                    <a href="javascript:void(null)" onClick={onGoBack} className="iconfont icon-back"></a>
                    <SlideTabs ref="swipelist" axis="x" activeIndex={activeIndex} navbarSlidable={false} >
                        {
                            imgList.map((v,k)=>{
                                var t = k+1+" / "+imgList.length;
                                return (
                                    <SlideTabsItem key={k} navigator={()=>{ 
                                        return (
                                            <span className="header">
                                                <b>{t}</b>
                                            </span>
                                        )
                                    }}>
                                        <img src={v} />
                                    </SlideTabsItem>
                                )
                            })
                        }
                    </SlideTabs>
                </div>
            )
        }
        return null;
    }
}

Swipelist.defaultProps = {
    activeIndex: 0,
    canBack:true,
    onGoBack:function(e){
        e.preventDefault();
        window.history.back();
    }
}

export default Swipelist;