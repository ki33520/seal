'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Filter extends Component{
    handleSave(){
        this.props.closePanel();
    }

    handleCheck(index){
        const {names,changeParam} = this.props;
        names[index].isChecked = !names[index].isChecked;
        changeParam(names);
    }

    renderNav(names){

        if(!names || names.length<1){
            return '暂无分类';
        }
        var menu = names.map((item,i)=>{
            const key="nav-"+i;
            const checked = classNames("iconfont",{
                "icon-check": item.isChecked
            });
            return (
                <dl onClick={this.handleCheck.bind(this,i)} key={key}>
                    <dt>{item.name}</dt>
                    <dd className={checked}></dd>
                </dl>
            )
        });
        
 
        return (
            <div className="helpList">
                {menu}
            </div>
        )
    }

    render(){
        const {active,names,closePanel} = this.props;
        const classess = classNames({
            "second-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":active
        });
 
        return (
            <div className={classess}>
            	<Header handleGoBack={closePanel.bind(this)}>
                    <span className="btn-right" onClick={this.handleSave.bind(this)}>确定</span>
                </Header>
                {this.renderNav(names)}
            </div>
        );
    }
}
 

export default Filter;