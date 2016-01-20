'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Sidebar extends Component{
 
    canBuy(){
        const {isHaveGoods,toggleCanBuy} = this.props;
        let have = !isHaveGoods;
        toggleCanBuy(have);
    }

    render(){
        const {popupActive,isHaveGoods,save,handleReset} = this.props;
        const classes=classNames({
            "menu-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":popupActive
        });
        const exist = classNames({
            onShow:isHaveGoods
        })
       
        return (
            <div className={classes}>
            	<Header canBack={false}>
                    <span className="btn-left" onClick={handleReset.bind(this)}>重置</span>
                    <span className="btn-right" onClick={save.bind(this)}>确定</span>
                </Header>
                
                <div className="showHave">
                	<dl>
                        <dt>只显示有货</dt>
                        <dd className={exist} onClick={this.canBuy.bind(this)}><i></i></dd>
                    </dl>
                </div>
                
                <div className="helpList">
                    <dl onClick={this.props.toggleClass.bind(this)}>
                        <dt>类别</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.toggleBrand.bind(this)}>
                        <dt>品牌</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.toggleArea.bind(this)}>
                        <dt>产地</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                </div>
            </div>
        );
    }
}
export default Sidebar;