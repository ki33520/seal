'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Node extends Component{
    renderNode(list){
        return list.map((child,i)=>{
            const key = "comment-" + i;
            var stars = [],
                imagesUrl = child.imageUrl.split(','),
                picList = [];
            for(let i=1;i<imagesUrl.length;i++){
                picList.push(<li key={i}><img src={imagesUrl[i]} /></li>);
            };
            const listclass = classNames({
                "pic-list": true,
                "hide": !picList.length
            })
            for(let i=0;i<5;i++){
                let star;
                if(i<child.stars){
                    star = (<div key={i} className="iconfont icon-star-full"></div>);
                }else{
                    star = (<div key={i} className="iconfont icon-star-empty"></div>);
                }
                stars.push(star)
            };
            return (
                <li id={child.goodId} key={key}>
                    <div className="product">
                        <div className="col col-left">
                            <img src={imagesUrl[0]} />
                        </div>
                        <div className="col col-right">
                            <div className="origin"><img src={child.originImageUrl} />{child.origin}</div>
                            <div className="title">{child.title}</div>
                        </div>
                    </div>
                    <div className="stars-culm">
                        <div className={"stars stars-"+child.stars}>
                            {stars}
                        </div>
                        <div className="date">{child.createAt}</div>
                    </div>
                    <div className="content">{child.content}</div>
                    <ul className={listclass}>
                        {picList}
                    </ul>
                    
                </li>
            )
        });
    }
    render(){
        const {comments} = this.props;
        return (
            <ul className="comment-list">
                {
                    comments && comments.list && this.renderNode(comments.list)
                }
            </ul>
        )
    }
}

export default Node;