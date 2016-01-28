'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodList extends Component{
    renderIcon(goods){
        var icons = [];
        if(goods.isSaleOut){
            icons.push(<div className="sale-out" key="out"></div>);
        }
        if(goods.isFlashPrice){
            icons.push(<div className="flash-price" key="flash"></div>);
        }else if(goods.isMobilePrice){
            icons.push(<div className="mobile-price" key="mobile"></div>);
        }
        return icons;
    }
    renderGoods(){
        const {list} = this.props.category;
        if(list.length > 0){
            return list.map((goods,i)=>{
                return (
                    <a href={"/gooddetail/"+goods.id} className="clearfix" key={i}>
                        <img src={goods.imageUrl}/>
                        {this.renderIcon(goods)}
                        <div className="right">
                            <span className="name">{goods.title}</span>
                            <span className="country">
                                <i><img src={goods.sourceImageUrl} /></i>{goods.sourceName}
                            </span>
                            <span className="nowPrice">&yen;{goods.salesPrice}</span>
                            <span className="oldPrice">&yen;{goods.originPrice}</span>
                        </div>
                    </a>
                )
            })
        }
        return null
    }
    render(){
        return (
            <div className="activityGeneral">
            {this.renderGoods()}
            </div>
        )
    }
}

export default GoodList;