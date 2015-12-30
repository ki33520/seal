'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";
import{isHaveGoods} from "../constant.es6";

class Filter extends Component{
    constructor(props){
        super(props);
        this.state = {
            isHaveGoods:isHaveGoods
        }
    }

    toggleCanBuy(){
        var isHaveGood = !this.state.isHaveGoods;
        this.setState({
            isHaveGoods:isHaveGood
        })

        this.props.handleCanBuy({
            isHaveGoods:isHaveGood
        });
    }

    handleReset(){
        this.setState({
            isHaveGoods:false
        })
    }

    render(){
        const {popupActive} = this.props;
        const classes=classNames({
            "menu-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":popupActive
        });
        const exist = classNames({
            onShow:this.state.isHaveGoods
        })
       
        return (
            <div className={classes}>
            	<Header canBack={false}>
                    <span className="btn-left" onClick={this.handleReset.bind(this)}>重置</span>
                    <span className="btn-right" onClick={this.props.handleClose.bind(this)}>确定</span>
                </Header>
                
                <div className="showHave">
                	<dl>
                        <dt>只显示有货</dt>
                        <dd className={exist} onClick={this.toggleCanBuy.bind(this)}><i></i></dd>
                    </dl>
                </div>
                
                <div className="helpList">
                    <dl onClick={this.props.filter.bind(this,'classfiy')}>
                        <dt>类别</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.filter.bind(this,'brand')}>
                        <dt>品牌</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.filter.bind(this,'product')}>
                        <dt>产地</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                </div>
            </div>
        );
    }
}
export default Filter;