'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Filter extends Component{
    switchFilter(type){
        this.props.handleFilter();
        //this.props.classifyFilter(type);
    }

    handleReset(){
        this.props.handleReset();
    }

    handleClose(){
        this.props.handleClose();
    }

    handleCanBuy(){
        this.props.handleCanBuy();
    }

    render(){
        const {popupActive,showNotEmpty} = this.props;
        const classes=classNames({
            "menu-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":popupActive
        });
        const exist = classNames({
            onShow:showNotEmpty
        })
       
        return (
            <div className={classes}>
            	<Header canBack={false}>
                    <span className="btn-left" onClick={this.handleReset.bind(this)}>重置</span>
                    <span className="btn-right" onClick={this.handleClose.bind(this)}>确定</span>
                </Header>
                
                <div className="showHave">
                	<dl>
                        <dt>只显示有货</dt>
                        <dd className={exist} onClick={this.handleCanBuy.bind(this)}><i></i></dd>
                    </dl>
                </div>
                
                <div className="helpList">
                	<a href="javascript:void(0);">
                        <dl onClick={this.switchFilter.bind(this,'classify')}>
                            <dt>类别</dt>
                            <dd className="iconfont icon-right"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl onClick={this.switchFilter.bind(this,'brand')}>
                            <dt>品牌</dt>
                            <dd className="iconfont icon-right"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl onClick={this.switchFilter.bind(this,'product')}>
                            <dt>产地</dt>
                            <dd className="iconfont icon-right"></dd>
                        </dl>
                    </a>
                </div>
            </div>
        );
    }
}
export default Filter;