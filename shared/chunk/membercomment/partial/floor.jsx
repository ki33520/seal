'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import moment from "moment";

class Floor extends Component{
    renderNode(list){
        if(list>0){
            return (
                <ul className="comment-list">
                    {
                        list.map((child,i)=>{
                            const key = "comment-" + i;
                            const crtTime = moment(new Date(child.createdAt)).format("YYYY-MM-DD HH:MM:SS");
                            var stars = [],
                                imagesList = child.imagesUrl ? child.imagesUrl.split(",") : [],
                                picList = [];
                            if(imagesList){
                                picList = imagesList.map((v,k)=>{
                                    return <li key={i}><img src={imagesList[k]} /></li>;
                                });
                            };
                            const listclass = classNames({
                                "pic-list": true,
                                "hide": !picList.length
                            })
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
                                                <span><i>￥</i>{child.salesPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stars-culm">
                                        <div className={"stars stars-"+child.rate}>
                                            {stars}
                                        </div>
                                        <div className="date">{crtTime}</div>
                                    </div>
                                    <div className="content">{child.content}</div>
                                    <ul className={listclass}>
                                        {picList}
                                    </ul>
                                    
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        return (
            <div className="empty-result">
                <h3>您目前没有任何收藏哦</h3>
                <a className="btn-link" href="/">随便逛逛</a>
            </div>
        )
    }
    render(){
        const {comments} = this.props;
        console.log(this.props)
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