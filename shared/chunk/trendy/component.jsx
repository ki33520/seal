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
            currentIndex:0
        }
    }

    handleClick(index){
        this.setState({
            currentIndex:index
        });
    }

    renderNav(){
        var nav = ["美容彩妆","母婴用品","营养保健"];
        return nav.map((name,i)=>{
            const classes = classNames({
                "current":i === this.state.currentIndex
            });
            return (
                <li className={classes} key={"tab-nav-"+i} 
                onClick={this.handleClick.bind(this,i)}>{name}</li>
            );
        });
    }

    render(){
        const {pagination} = this.props;
        var goods = [];
       
        if(pagination.length > 0){
            pagination.forEach(function(item,i){
                const key = "good-" + i;
                goods.push(<GoodItem goods={item} key={key} />)
            })
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
                    <ul>{this.renderNav()}</ul>
                </div>
                <div className="polyCon">
                    <div className="activityGeneral">
                        {goods}
                    </div>
                </div>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;