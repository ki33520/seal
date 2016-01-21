'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Refresher from "../../../component/refresher.jsx";
import Sticky from "../../../component/sticky.jsx";
import Icon from "../../../component/icon.jsx";
import GoodList from "./goodlist.jsx";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";
import Loading from "../../common/loading.jsx";

class Trendy extends React.Component{
    beginRefresh(index){
        const {categories} = this.props.trendy;
        let curentPage = categories[index].pageIndex
        let totalPage = categories[index].totalPage
        let nextPage = curentPage + 1
        let isFetching = categories[index].isFetching
        if(isFetching || totalPage <= curentPage){
            return false;
        }

        this.props.fetchGoods({
            id:categories[index].id,
            pageIndex:nextPage,
            index:index
        });
    }
    handleSelect(index){
        const {categories} = this.props.trendy;
        if(categories[index].list.length === 0){
            this.props.fetchGoods({
                id:categories[index].id,
                pageIndex:1,
                index
            });
        }
    }
    render(){
        const {categories} = this.props.trendy;
        const tabs = categories.map((category,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{category.name}</i>} key={i}>
                    <div><GoodList category={category} />
                    <Refresher handleRefresh={this.beginRefresh.bind(this,i)} active={category.isFetching}/>
                    <Loading active={category.list.length === 0}/>
                    </div>
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
                <SlideTabs axis="x" onSelect={this.handleSelect.bind(this)}>
                {tabs}
                </SlideTabs>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

 

export default Trendy;