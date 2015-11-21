'use strict';

import React,{Component} from "react";

class Node extends Component{
    render(){
        const {collect} = this.props;
        //console.log(collect)

        return (
            <ul className="collect-list">
                {
                    collect.map((child,key) => {
                        return (
                            <li id={child.goodId} key={key}>
                                <div className="col col-left">
                                    <img src={child.imageUrl} />
                                </div>
                                <div className="col col-right">
                                    <div className="title">{child.title}</div>
                                    <div className="origin"><img src={child.originImageUrl} />{child.origin}</div>
                                    <div className="price">
                                        <span>{"￥"+child.salesPrice}</span>
                                        <span>{"￥"+child.standardPrice}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default Node;