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
    componentDidMount(){
        this.props.fetchCartCount()
    }
    render(){
        const {changeScene,cartByCount} = this.props;
        return (
            <div className="polymer-content">
                <Header canBack={false}>
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={changeScene.bind(this,"search")}>
                        <a className="search" href="javascript:;"></a>
                    </div>
                </Header>
                <div className="polymer-list">
                    <Swiper onSelect={this.handleSelect.bind(this)} contentSliding={true}>
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
                <Footer activeIndex="1" buyed={cartByCount.amount}/>
            </div>
        )
    }
}

export default Polymer;