'use strict';

import React,{Component} from "react";

class Floor extends Component{
    formatPrice(price){
        var _price = Number(price).toFixed(2).split('.');
        return <span><i className="price_a">{_price[0]}</i><i className="price_dot">.</i><i className="price_b">{_price[1]}</i></span>
    }
    render(){
        const {list,handleDelete} = this.props;
        if(list.length>0){
            return (
                <ul className="collect-list">
                    {
                        list.map((child,key) => {
                            var masker = null;
                            if(child.stock===0){
                                masker = <div className="sold_out"></div>
                            }
                            if(child.version===2){
                                masker = <div className="not_sell"></div>
                            }
                            return (
                                <li id={child.goodId} key={key}>
                                    <div className="col">
                                        <div className="col-left">
                                            {masker}
                                            <a href={"/gooddetail/"+child.singleCode}>
                                                <img src={child.imageUrl} />
                                            </a>
                                        </div>
                                        <div className="col-right">
                                            <div className="title"><a href={"/gooddetail/"+child.singleCode}>{child.title}</a></div>
                                            <div className="origin"><img src={child.sourceImage} />{child.sourceName}</div>
                                            <div className="price">
                                                <span className="price-sales"><i>￥</i>{this.formatPrice(child.salesPrice)}</span>
                                                <span className="price-origin"><i>￥</i>{this.formatPrice(child.originPrice)}</span>
                                                <span className="delete"><a onClick={handleDelete.bind(this,child)} className="iconfont icon-trash"></a></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }else{
            return (
                <div className="empty-result">
                    <h3>您目前没有任何收藏哟~</h3>
                    <a className="btn-link" href="/">随便逛逛</a>
                </div>
            )
        }
        
    }
}

export default Floor;