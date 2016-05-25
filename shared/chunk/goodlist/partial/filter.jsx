'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Filter extends Component{
    constructor(props){
        super(props);
    }
    handleCheck(index){
        let list = [...this.props.list];
        let item = {...list[index]};
        item.isChecked = !item.isChecked;
        list[index] = item;
        this.props.toggleChecked(list);
    }
    renderNav(items){
        if(!items || items.length<1){
            return '暂无分类';
        }
        let menu = items.map((item,i)=>{
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
        const {list,active,handleGoBack} = this.props;
        const classess = classNames({
            "second-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":active
        });
 
        return (
            <div className={classess}>
            	<Header onGoBack={handleGoBack.bind(this)}>
                    <span className="btn-right" onClick={handleGoBack.bind(this)}>确定</span>
                </Header>
                {this.renderNav(list)}
            </div>
        );
    }
}

export default Filter;
