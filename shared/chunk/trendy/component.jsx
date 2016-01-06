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
import {Tabs,TabsItem} from "../../component/tabs.jsx";

class Trendy extends React.Component{

    handleSearch(){
        location.href="/search";
    }

    renderContent(goodsList){
        var goods = [];
       
        if(goodsList.length > 0){
            goodsList.forEach(function(item,i){
                const key = "good-" + i;
                goods.push(<GoodItem goods={item} key={key} />)
            })
        }

        return (
            <div className="activityGeneral">{goods}</div>
        );
    }

    renderNav(){
        const {pagination} = this.props;
        let titles = pagination.titles;
        let goodsList = pagination.goodsList;

        return titles.map((name,i)=>{
            return (
                <TabsItem title={<i>{name}</i>} key={'nav-'+i}>
                    {this.renderContent(goodsList[i])}
                </TabsItem>
            );
        });
    }

    render(){
        
        return (
            <div>
                <Header canBack="false">
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={this.handleSearch.bind(this)}>
                        <Icon icon="search"/>
                    </div>
                </Header> 
                <Tabs effect="slide">
                    {this.renderNav()}
                </Tabs>
 
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;