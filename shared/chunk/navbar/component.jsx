'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
//import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

class Navbar extends Component{
 
    handleSearch(){
        location.href="/search"
    }
    
    
    render(){
        //var {categorys,brands,origins} = this.props;
        var categorys=[1];
        var brands = [1];
        var origins = [1];
        categorys = categorys.map((category,i)=>{
            const key = "category-" + i;
            return (
                <CategoryRow category={category} key={key}/>
            )
        });
        brands = brands.map((brand,i)=>{
            const key = "brand-" + i;
            return (
                <BrandRow brand={brand} key={key}/>
            )
        });
        origins = origins.map((origin,i)=>{
            const key = "origin-" + i;
            return (
                <OriginRow origin={origin} key={key}/>
            )
        });
        return (
            <div className="box">
                <Header>
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={this.handleSearch.bind(this)}>
                        <Icon icon="search"/>
                    </div>
                </Header>
                <div className="coupon-list">
                    <Tabs effect="slide">
                        <TabsItem title={<i>类别</i>}>{categorys}</TabsItem>
                        <TabsItem title={<i>品牌</i>}>{brands}</TabsItem>
                        <TabsItem title={<i>产地</i>}>{origins}</TabsItem>
                    </Tabs>
                </div>
            </div>
        )
    }
}

class CategoryRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }

    handleClick(index){
        this.setState({
            activeIndex:index
        })
    }

    renderNav(){
        var titles = ["母婴用品","美容彩妆","营养保健","家居洗护","进口美食"];
        return titles.map((name,i)=>{
            let current = classNames("name",{
                "active":i===this.state.activeIndex
            });
            let key = "nav-"+i;
            return (
                <li className={current} key={key} onClick={this.handleClick.bind(this,i)}>{name}</li>
            )
        });
    }

    renderContent(){
        var content=[1,2,3,4,5];

        return content.map((item,i)=>{
            let classes = classNames("fadeIn",{
                "sh":i===this.state.activeIndex
            })
            return (
                <div className={classes}>
                    <a href="#" className="ad">
                        <img src="/client/asset/images/pic24.gif"/>
                    </a>
                    <div className="content">
                        <div className="title">热门分类</div>
                        <a href="/" className="cg">
                            <img src="/client/asset/images/965_G_1445533723842.gif"/>
                            <div>母婴直邮</div>
                        </a>
                        <a href="/" className="cg">
                            <img src="/client/asset/images/965_G_1445533723842.gif"/>
                            <div>美妆直邮</div>
                        </a>
                        <a href="/" className="cg">
                            <img src="/client/asset/images/965_G_1445533723842.gif"/>
                            <div>保健直邮</div>
                        </a>
                    </div>
                </div>
            )
        })
  
    }

    render(){
        //let {category} = this.props;
         
        return (
            <div>
                <div className="category-bd"></div>
                <ul className="leftNav">
                    {this.renderNav()}
                </ul>
                <div className="rightCon">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

class BrandRow extends Component{
    render(){
        const {brand} = this.props;
         
        return (
            <div>
                <a href="#" className="allBrand">全部品牌<i className="iconfont icon-right"></i></a>
                <div className="title">推荐品牌</div>
                <div className="brandList clearfix">
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                </div>
                <div className="title">母婴用品</div>
                <div className="brandList clearfix">
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                </div>
                <div className="title">母婴用品</div>
                <div className="brandList clearfix">
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                </div>
            </div>
        );
    }
}

class OriginRow extends Component{
    render(){
        const {origin} = this.props;
         
        return (
            <div>
                <div className="kindArea">
                    <a href="#"><img src="/client/asset/images/area_usa.gif"/></a>
                    <a href="#"><img src="/client/asset/images/area_korea.gif"/></a>
                    <a href="#"><img src="/client/asset/images/area_japan.gif"/></a>
                </div>
            </div>
        );
    }
}
export default Navbar;