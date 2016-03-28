'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";
import Loading from "../../common/loading.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
import Icon from "../../../component/icon.jsx";
import GoodList from "./goodlist.jsx";

class Trendy extends React.Component{
    beginRefresh(index){
        const {categories,isFetching} = this.props.trendy;
        const curentPage = categories[index].pageIndex;
        const totalPage = categories[index].totalPage;
        const nextPage = curentPage + 1;
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
        const {categories,isFetched,isFetching} = this.props.trendy;
        const tabs = categories.map((category,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{category.name}</i>} key={i}>
                    <GoTop relative={true}>
                        <GoodList category={category} />
                        <Refresher handleRefresh={this.beginRefresh.bind(this,i)} active={isFetching}/>
                        {category.pageIndex == category.totalPage?(<div className="no-more">已显示全部内容</div>):null}
                        <Loading active={isFetching}/>
                    </GoTop>
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