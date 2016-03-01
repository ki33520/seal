'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import moment from "moment";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";

class Floor extends Component{
    renderNode(list){
        if(list.length>0){
            return (
                <ul className="comment-list">
                    {
                        list.map((child,i)=>{
                            const key = "comment-" + i;
                            const crtTime = moment(new Date(child.createdAt)).format("YYYY-MM-DD HH:mm:ss");
                            var stars = [];
                            var picList = null;
                            var content;
                            if(child.imageUrlList.length > 0){
                                picList = (
                                    <div className="pic-list clearfix">
                                        {
                                            child.imageUrlList.map((v,k)=>{
                                                var object = {data:child.imageUrlList, activeIndex:k}
                                                return (
                                                    <div key={k} className="pic-item">
                                                        <div className="img-wrap" onClick={this.props.changeScene.bind(this,"photo",object)}><img src={v} /></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            };
                            for(let i=0;i<5;i++){
                                let star;
                                if(i<child.rate){
                                    star = (<div key={i} className="iconfont icon-star-full"></div>);
                                }else{
                                    star = (<div key={i} className="iconfont icon-star-empty"></div>);
                                }
                                stars.push(star)
                            };
                            return (
                                <li key={key}>
                                    <div className="product">
                                        <div className="col col-left">
                                            <a href={"/gooddetail/"+child.singleCode}><img src={child.singleImage} /></a>
                                        </div>
                                        <div className="col col-right">
                                            <div className="title">{child.singleTitle}</div>
                                            <div className="price">
                                                <span><i>￥</i>{child.salesPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stars-culm">
                                        <div className={"stars stars-"+child.rate}>
                                            {stars}
                                        </div>
                                        <div className="date">{crtTime}</div>
                                    </div>
                                    <div className="content">{child.content || "没有评论内容"}</div>
                                    {picList}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        const {floorIndex} = this.props; 
        var context = (function(){
            switch(floorIndex){
                case 1:
                    return "您目前还没有任何晒单哟~";
                default:
                    return "您目前还没有任何评论哟~";
            }
        })();
        return (
            <div className={"empty-result empty-result-"+floorIndex}>
                <h3>{context}</h3>
            </div>
        )
    }
    render(){
        const {comments} = this.props;
        return (
            <div>
            {
                comments && comments.list && this.renderNode(comments.list)
            }
            </div>
        )
    }
}

export default Floor;