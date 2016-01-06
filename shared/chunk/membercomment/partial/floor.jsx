'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Floor extends Component{
    renderNode(list){
        return list.map((child,i)=>{
            const key = "comment-" + i;
            var stars = [],
                imagesList = child.imageUrlList,
                picList = [];
            for(let i=0;i<imagesList.length;i++){
                picList.push(<li key={i}><img src={imagesList[i]} /></li>);
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
                            <img src={imagesList[0]} />
                        </div>
                        <div className="col col-right">
                            <div className="origin"><img src={child.originImageUrl} />{child.origin}</div>
                            <div className="title">{child.productName}</div>
                        </div>
                    </div>
                    <div className="stars-culm">
                        <div className={"stars stars-"+child.stars}>
                            {stars}
                        </div>
                        <div className="date">{child.createdAt}</div>
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

export default Floor;