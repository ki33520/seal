'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import fetchGoods from "./action.es6";

import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Refresher from "../../component/refresher.jsx";
import Icon from "../../component/icon.jsx";
import GoodItem from "./partial/goodItem.jsx";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";

class Trendy extends React.Component{

    handleSearch(){
        location.href="/search";
    }


    handleClick(index){
 
        const {titles,list,dispatch} = this.props;

        if(list[index].length){
            return false;
        }

        dispatch(fetchGoods('/trendyActivity',{
            id:titles[index].id,
            pageIndex:1,
            index
        }));
    }

    renderContent(list){
        var goods = [];
       
        list.forEach(function(item,i){
            goods.push(<GoodItem goods={item} key={"good-" + i} />)
        })
        
        return (
            <div className="activityGeneral">{goods}</div>
        );
    }

    render(){
        const {titles,list} = this.props;
 
        const tabs = titles.map((item,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{item.name}</i>} key={i}>
                    {this.renderContent(list[i])}
                </SlideTabsItem>
            )
        })
        return (
            <div>
                <Header canBack="false">
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={this.handleSearch.bind(this)}>
                        <Icon icon="search"/>
                    </div>
                </Header> 
                <SlideTabs axis="x" onSelect={this.handleClick.bind(this)}>
                    {tabs}
                </SlideTabs>
     
                <Refresher active={this.props.isFetching}/>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;