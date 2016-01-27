'use strict';

import React,{Component} from "react";

class Floor extends Component{
    render(){
        const {list} = this.props;
        if(list>0){
            return (
                <ul className="collect-list">
                    {
                        list.map((child,key) => {
                            return (
                                <li id={child.goodId} key={key}>
                                    <a href={"/gooddetail/"+child.singleCode}>
                                        <div className="col col-left">
                                            <img src={child.imageUrl} />
                                        </div>
                                        <div className="col col-right">
                                            <div className="title">{child.title}</div>
                                            <div className="origin"><img src={child.sourceImage} />{child.sourceName}</div>
                                            <div className="price">
                                                <span><i>￥</i>{child.salesPrice}</span>
                                                <span><i>￥</i>{child.originPrice}</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }else{
            return (
                <div className="empty-result">
                    <h3>您目前没有任何收藏哦</h3>
                    <a className="btn-link" href="/">随便逛逛</a>
                </div>
            )
        }
        
    }
}

export default Floor;