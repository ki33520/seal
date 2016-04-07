'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";
import Icon from "../../../component/icon.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import {Swiper,SwiperItem} from "../../../component/swiper.jsx";
import GoodList from "./goodlist.jsx";

class Trendy extends React.Component{
    constructor(props){
        super(props)
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
                <SwiperItem control={()=><i>{category.name}</i>} key={i}>
                    <GoodList category={category} index={i} {...this.props} />
                </SwiperItem>
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
                <Swiper onSelect={this.handleSelect.bind(this)}>
                {tabs}
                </Swiper>
                <Footer activeIndex="2"/>
            </div>
        )
    }
}

export default Trendy;