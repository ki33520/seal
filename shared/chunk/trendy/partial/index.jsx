'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import fetchGoods from "../action.es6";

import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Refresher from "../../../component/refresher.jsx";
import GoTop from "../../../component/gotop.jsx";
import Sticky from "../../../component/sticky.jsx";
import Icon from "../../../component/icon.jsx";
import GoodItem from "./goodItem.jsx";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";

class Trendy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }

    handleSearch(){
        location.href="#/search";
    }


    handleClick(index){
        const {category,totalPages,dispatch} = this.props;

        this.setState({
            activeIndex:index
        });
 
        if(totalPages[index]){
            return false;
        }

        dispatch(fetchGoods('/trendyActivity',{
            id:category[index].id,
            pageIndex:1,
            index
        }));
    }
    beginRefresh(){
        const {dispatch,totalPages,category,pageIndexs,isFetching} = this.props;
        const {activeIndex} = this.state;
        let curentPage = pageIndexs[activeIndex];
        let totalPage = totalPages[activeIndex];
        let activeId = category[activeIndex].id;
        let nextPage = curentPage + 1;

        if(isFetching || totalPage <= curentPage){
            return false;
        }

        dispatch(fetchGoods('/trendyActivity',{
            id:activeId,
            pageIndex:nextPage,
            index:activeIndex
        }));
    }

    renderContent(goodList){
        var goods = [];
       
        goodList.forEach(function(item,i){
            goods.push(<GoodItem goods={item} key={"good-" + i} />)
        })
        
        return (
            <div className="activityGeneral">
            {goods}
            </div>
        );
    }
    render(){
        const {category,goodList} = this.props;
        const tabs = category.map((item,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{item.name}</i>} key={i}>
                    {this.renderContent(goodList[i])}
                    <Refresher active={this.props.isFetching} handleRefresh={this.beginRefresh.bind(this)}/>
                    <GoTop relative={true}/>
                </SlideTabsItem>
            )
        })
        return (
            <div className="trendy-content">
                <Header canBack="false">
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={this.handleSearch}>
                        <Icon icon="search"/>
                    </div>
                </Header> 
                <SlideTabs axis="x" onSelect={this.handleClick.bind(this)}>
                    {tabs}
                </SlideTabs>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;