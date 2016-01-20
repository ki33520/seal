'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodList extends Component{
    renderGoods(){
        const {list} = this.props.category;
        if(list.length > 0){
            return list.map((good,i)=>{
                const statusClass = classNames({
                    "soldOut":good.stock
                });
                return (
                    <a href={"/gooddetail/"+good.singleCode} className="clearfix" key={i}>
                        <img src={good.imageUrl}/>
                        <div className={statusClass}></div>
                        <div className="right">
                            <span className="name">{good.title}</span>
                            <span className="country"><i><img src={good.flag} /></i>{good.country}</span>
                            <span className="nowPrice">&yen;{good.salePrice}</span>
                            <span className="oldPrice">&yen;{good.originPrice}</span>
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