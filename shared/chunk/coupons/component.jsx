'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";

import Refresher from "../../component/refresher.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import GoTop from "../../component/gotop.jsx";
import Icon from "../../component/icon.jsx";
import Tabs from "../../component/tabs.jsx";
import Header from "../common/header.jsx";
 
 

class Coupons extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex
        }
    }
    componentDidMount(){
       
    }


    render(){
        const {isFetching,pagination,isFetched,title} = this.props;
         
   

        return (
            <div>
                <Header>
                    <span className="title">{title}</span>
                </Header>
                <div className="polyTabs">
                    <ul>
                        <li className="current"><i>友阿优惠券</i></li>
                        <li><i>联盟优惠券</i></li>
                        <li><i>已失效优惠券</i></li>
                    </ul>
                </div>
                <Tabs />
                <div className="listMain">
        
                    <div className="tabCon">
            

 
                             
                    </div>
                    
                </div>
            </div>
        )
    }
}

Coupons.defaultProps = {
    activeIndex:0
}
 

export default Coupons;