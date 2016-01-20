'use strict';

import React,{Component} from "react";
import _ from "lodash";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";
import Icon from "../../../component/icon.jsx";
import classNames from "classnames";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Category from "./category.jsx";
import Brand from "./brand.jsx";
import Origin from "./origin.jsx";

class Polymer extends Component{
    handleSelect(i){
        const {fetchCategoryBrands,categoryBrands,fetchAllOrigins,allOrigin} = this.props
        if(i === 1 && _.isEmpty(categoryBrands)){
            fetchCategoryBrands()
        }
        if(i === 2 && _.isEmpty(allOrigin)){
            fetchAllOrigins()
        }
    }
    render(){
        const {changeScene} = this.props
        return (
            <div className="polymer-content">
                <Header>
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right">
                        <a href="javascript:void(null)" onClick={changeScene.bind(this,"search")}><Icon icon="search"/></a>
                    </div>
                </Header>
                <div className="polymer-list">
                    <SlideTabs navbarSlidable={false} onSelect={this.handleSelect.bind(this)}>
                        <SlideTabsItem navigator={()=><i>类别</i>}>
                            <Category {...this.props.allCategory}/>
                        </SlideTabsItem>
                        <SlideTabsItem navigator={()=><i>品牌</i>}>
                            <Brand {...this.props}/>
                        </SlideTabsItem>
                        <SlideTabsItem navigator={()=><i>产地</i>}>
                            <Origin {...this.props}/>
                        </SlideTabsItem>
                    </SlideTabs>
                </div>
                <Footer activeIndex="1"/>
            </div>
        )
    }
}

export default Polymer;