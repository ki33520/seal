'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodList extends Component{
    
    render(){
    	const {list} = this.props.channel;
        const itemList = list.map((goods,i)=>{
            const statusClass = classNames({
                "soldOut":goods.stock
            });
            return (
                <a href="#" className="clearfix" key={i}>
                    <img src={goods.imageUrl}/>
                    <div className={statusClass}></div>
                    <div className="right">
                        <span className="name">{goods.title}</span>
                        <span className="country"><i><img src={goods.flag} /></i>{goods.country}</span>
                        <span className="nowPrice">&yen;{goods.salePrice}</span>
                        <span className="oldPrice">&yen;{goods.originPrice}</span>
                    </div>
                </a>
            )
        })
    	return (
            <div className="activityGeneral">
                {itemList}
            </div>
        )
    }
}

export default GoodList;