'use strict';

import React,{Component} from "react";

class Node extends Component{
    render(){
        const {list} = this.props;
        return (
            <ul className="collect-list">
                {
                    list.map((child,key) => {
                        return (
                            <li id={child.goodId} key={key}>
                                <a href={"/gooddetail/"+child.id}>
                                    <div className="col col-left">
                                        <img src={child.imageUrl} />
                                    </div>
                                    <div className="col col-right">
                                        <div className="title">{child.title}</div>
                                        <div className="origin"><img src={child.originImageUrl} />{child.origin}</div>
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
    }
}

export default Node;