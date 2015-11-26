'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class FilterClassify extends Component{

    handleGoBack(){
        this.props.handleClose();
    }

    handleCheck(e){
        //alert(e.target)
    }

    handleSure(){
        this.props.handleClose();
    }

    render(){
        const {type,active,classify} = this.props;
        const classess = classNames({
            "second-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":active
        });

        return (
            <div className={classess}>
            	<Header handleGoBack={this.handleGoBack.bind(this)}>
                    <span className="btn-right" onClick={this.handleSure.bind(this)}>确定</span>
                </Header>
                
                <div className="helpList">
                    <a href="javascript:void(0);">
                        <dl onClick={this.handleCheck.bind(this)}>
                            <dt>婴儿奶粉</dt>
                            <dd className="iconfont icon-check"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl>
                            <dt>宝宝尿裤</dt>
                            <dd className="iconfont"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl>
                            <dt>营养辅食</dt>
                            <dd className="iconfont"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl>
                            <dt>宝宝洗护</dt>
                            <dd className="iconfont"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl>
                            <dt>喂哺餐具</dt>
                            <dd className="iconfont"></dd>
                        </dl>
                    </a>
                </div>
                <div className="helpList">
                    <a href="javascript:void(0);">
                        <dl>
                            <dt>基础护肤</dt>
                            <dd className="iconfont"></dd>
                        </dl>
                    </a>
                    <a href="javascript:void(0);">
                        <dl>
                            <dt>清新面膜</dt>
                            <dd className="iconfont"></dd>
                        </dl>
                    </a>
                </div>
            </div>
        );
    }
}
 

export default FilterClassify;