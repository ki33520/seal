'use strict';

import React,{Component} from "react";
import _ from "../../../lib/lodash.es6";
import Header from "../../common/header.jsx";
import Footer from "../../common/footer.jsx";
import Icon from "../../../component/icon.jsx";
import classNames from "classnames";
import {Swiper,SwiperItem} from "../../../component/swiper.jsx";
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
                    <div className="btn-right">
                        <a href="javascript:;" onClick={changeScene.bind(this,"search")}><Icon icon="search"/></a>
                    </div>
                </Header>
                <div className="polymer-list">
                    <Swiper onSelect={this.handleSelect.bind(this)}>
                    <SwiperItem control={()=><b>类别</b>}>
                        <Category {...this.props.allCategory} {...this.props}/>
                    </SwiperItem>
                    <SwiperItem control={()=><b>品牌</b>}>
                        <Brand {...this.props}/>
                    </SwiperItem>
                    <SwiperItem control={()=><b>国家</b>}>
                        <Origin {...this.props}/>
                    </SwiperItem>
                    </Swiper>
                </div>
                <Footer activeIndex="1"/>
            </div>
        )
    }
}

export default Polymer;