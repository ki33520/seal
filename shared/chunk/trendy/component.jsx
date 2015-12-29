'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";

import Refresher from "../../component/refresher.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import GoTop from "../../component/gotop.jsx";
import Icon from "../../component/icon.jsx";
import GoodItem from "./partial/goodItem.jsx";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";

class Trendy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false
 
        }
    }
    componentDidMount(){
       
    }
 
  

    render(){
        const {isFetching,pagination,isFetched} = this.props;
         
        var goods = [];
        if(isFetched === true){
            if(pagination.list.length > 0){
                pagination.list.forEach(function(item,i){
                    const key = "good-" + i;
                    //item.salePrice = item.salePrice.toFixed(2);
                    //item.standardPrice = item.standardPrice.toFixed(2);
                    goods.push(<GoodItem goods={item} key={key} />)
                })
            }
        }

        return (
            <div>
                <Header canBack="false">
                    <div className="logo"><img src="client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right">
                        <Icon icon="search"/>
                    </div>
                </Header> 
                <div className="polyTabs">
                    <ul>
                        <li className="current"><i>美容彩妆</i></li>
                        <li><i>母婴用品</i></li>
                        <li><i>营养保健</i></li>
                    </ul>
                </div>
                <div className="polyCon">
                    <div id="page-content">
                        <div className="poly_1 page-0 page-current">
                            <div className="activityGeneral">
                                {goods}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;