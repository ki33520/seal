'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Sidebar extends Component{
    constructor(props){
        super(props);
    }
    toggleCanBuy(){
        const {isHaveGoods} = this.props;
        this.props.toggleHaveGoods({
            isHaveGoods:!isHaveGoods
        });
    }
    handleReset(){
        const isHaveGoods = Sidebar.defaultProps.isHaveGoods;
        this.props.handleReset({isHaveGoods});
    }
    render(){
        const {popupActive,isHaveGoods,handlerSave} = this.props;
        const menuStyle=classNames({
            "menu-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":popupActive
        });
        const filterSwitch = classNames({
            onShow:isHaveGoods
        });
        return (
            <div className={menuStyle}>
            	<Header canBack={false}>
                    <span className="btn-left" onClick={this.handleReset.bind(this)}>重置</span>
                    <span className="btn-right" onClick={handlerSave.bind(this)}>确定</span>
                </Header>
                <div className="showHave">
                	<dl>
                        <dt>只显示有货</dt>
                        <dd className={filterSwitch} onClick={this.toggleCanBuy.bind(this)}><i></i></dd>
                    </dl>
                </div>
                <div className="helpList">
                    <dl onClick={this.props.toggleFilter.bind(this,'category')}>
                        <dt>类别</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.toggleFilter.bind(this,'brand')}>
                        <dt>品牌</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                    <dl onClick={this.props.toggleFilter.bind(this,'area')}>
                        <dt>国家</dt>
                        <dd className="iconfont icon-right"></dd>
                    </dl>
                </div>
            </div>
        );
    }
}

Sidebar.defaultProps = {
    isHaveGoods:false
}

export default Sidebar;

