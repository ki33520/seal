'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isHaveGoods:false
        };
    }
    handleSave(){
        const {isHaveGoods} =  this.state;
        this.props.handlerSave(isHaveGoods);
    }
    toggleCanBuy(){
        this.setState({
            isHaveGoods:!this.state.isHaveGoods
        });
    }
    handleReset(){
        this.setState({
            isHaveGoods:false
        });
        this.props.handleReset();
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
        });
        return (
            <div className={classes}>
            	<Header canBack={false}>
                    <span className="btn-left" onClick={this.handleReset.bind(this)}>重置</span>
                    <span className="btn-right" onClick={this.handleSave.bind(this)}>确定</span>
                </Header>
                <div className="showHave">
                	<dl>
                        <dt>只显示有货</dt>
                        <dd className={exist} onClick={this.toggleCanBuy.bind(this)}><i></i></dd>
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
export default Sidebar;