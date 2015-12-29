'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";

import Refresher from "../../component/refresher.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import GoTop from "../../component/gotop.jsx";
import Icon from "../../component/icon.jsx";
import Header from "../common/header.jsx";
import GoodItem from "./partial/goodItem.jsx";
import ShareBox from "./partial/shareBox.jsx";

class Activity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            shareActive:false
        }
    }
    componentDidMount(){
       
    }

    handleShare(){
        this.setState({
            shareActive:true,
            maskActive:true
        })
    }

    cancelShare(){
        this.setState({
            shareActive:false,
            maskActive:false
        })
    }
  

    render(){
        const {isFetching,pagination,isFetched,title} = this.props;
         
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
                <Header>
                    <span className="title">{title}</span>
                    <div className="btn-right" onClick={this.handleShare.bind(this)}>
                        <Icon icon="share"/>
                    </div>
                </Header>
                 
                <div className="specialActivity">
                    <div className="banner">
                      <img src="client/asset/images/pic20.gif" alt="" />
                    </div>
                    <div className="specialActivity_list clearfix">
                        {goods}
                    </div>
                </div>
                <ShareBox visible={this.state.shareActive} cancelShare={this.cancelShare.bind(this)} />
                <MaskLayer visible={this.state.maskActive}  handleClick={this.cancelShare.bind(this)}/>
                <Refresher active={isFetching}/>
                <GoTop />
            </div>
        )
    }
}

 

export default Activity;