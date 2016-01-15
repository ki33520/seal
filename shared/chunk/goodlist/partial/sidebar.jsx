'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Sidebar extends Component{

    toggleCanBuy(){
        const {isHaveGoods} = this.props.params;
        const param = {
            isHaveGoods : !isHaveGoods
        }
        this.setState(param);
        this.props.changeParam(param);
    }

    render(){
        const {popupActive,params,toggleCanBuy,save,popupBrand,popupArea,popupClass,handleReset} = this.props;
        const classes=classNames({
            "menu-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":popupActive
        });
        const exist = classNames({
            onShow:params.isHaveGoods
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
                        <dd className={exist} onClick={toggleCanBuy.bind(this)}><i></i></dd>
                    </dl>
                </div>
                
                <div className="helpList">
                    <dl onClick={popupClass.bind(this)}>
                        <dt>类别</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={popupBrand.bind(this)}>
                        <dt>品牌</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={popupArea.bind(this)}>
                        <dt>产地</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                </div>
            </div>
        );
    }
}
export default Sidebar;