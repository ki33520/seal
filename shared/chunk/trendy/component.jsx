'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";

import Refresher from "../../component/refresher.jsx";
import GoTop from "../../component/gotop.jsx";
import Icon from "../../component/icon.jsx";
import GoodItem from "./partial/goodItem.jsx";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
import fetchGoods from "./action.es6";

class Trendy extends React.Component{

    handleSearch(){
        location.href="/search";
    }

    handleClick(index){
        const {pagination,dispatch} = this.props;
        const {titles} = pagination;
        
        dispatch(fetchGoods('/trendyActivity',{
            id:titles[index].id,
            pageIndex:1,
            index
        }));
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

        return titles.map((item,i)=>{
            return (
                <TabsItem title={<i>{item.name}</i>} key={'nav-'+i}>
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
                <Tabs effect="slide" onSelect={this.handleClick.bind(this)}>
                    {this.renderNav()}
                </Tabs>
                <Refresher active={this.props.isFetching}/>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;