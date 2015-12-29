'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";
 
class Filter extends Component{

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
                    <span className="btn-left" onClick={this.props.handleReset.bind(this)}>重置</span>
                    <span className="btn-right" onClick={this.props.handleClose.bind(this)}>确定</span>
                </Header>
                
                <div className="showHave">
                	<dl>
                        <dt>只显示有货</dt>
                        <dd className={exist} onClick={this.props.handleCanBuy.bind(this)}><i></i></dd>
                    </dl>
                </div>
                
                <div className="helpList">
                    <dl onClick={this.props.classifyFilter.bind(this)}>
                        <dt>类别</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.brandFilter.bind(this)}>
                        <dt>品牌</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.productFilter.bind(this)}>
                        <dt>产地</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                </div>
            </div>
        );
    }
}
export default Filter;