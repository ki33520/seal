'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import fetchGoods from "../action.es6";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Refresher from "../../../component/refresher.jsx";
import Sticky from "../../../component/sticky.jsx";
import Icon from "../../../component/icon.jsx";
import GoodList from "./goodList.jsx";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";
import Loading from "../../common/loading.jsx";

class Trendy extends React.Component{
 
    beginRefresh(i){
        const {dispatch,category,totalPages,pageIndexs,isFetching} = this.props;
        let curentPage = pageIndexs[i];
        let totalPage = totalPages[i];
        let nextPage = curentPage + 1;

        if(isFetching || totalPage <= curentPage){
            return false;
        }

        dispatch(fetchGoods('/trendyActivity',{
            id:category[i].id,
            pageIndex:nextPage,
            index:i
        }));
    }
    handleClick(index){
        const {category,totalPages,dispatch} = this.props;
 
        if(totalPages[index]){
            return false;
        }
        dispatch(fetchGoods('/trendyActivity',{
            id:category[index].id,
            pageIndex:1,
            index
        }));
    }
    render(){
        const {category} = this.props;
        const tabs = category.map((channel,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{channel.name}</i>} key={i}>
                    <GoodList channel={channel} />
                    <Refresher handleRefresh={this.beginRefresh.bind(this,i)}/>
                    <Loading active={this.props.isFetching}/>
                </SlideTabsItem>
            )
        });
        return (
            <div className="trendy-content">
                <Header canBack="false">
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={this.props.changeScene.bind(this,"search")}>
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