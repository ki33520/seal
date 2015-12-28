'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class FilterProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            isChecked:{}
        }
    }
 
    handleCheck(i,e){
        var isChecked = this.state.isChecked;
        isChecked[i] = !isChecked[i];
        this.setState({
            isChecked:isChecked
        });
    }
 

    renderNav(products){
        if(!products || products.length<1){
            return '暂无分类';
        }
        var menu = products.map((item,i)=>{
            const key="nav-"+i;
            const checked = classNames("iconfont",{
                "icon-check": this.state.isChecked[key]
            });
            return (
                <dl onClick={this.handleCheck.bind(this,key)} key={key}>
                    <dt>{item.name}</dt>
                    <dd className={checked}></dd>
                </dl>
            )
        });
        
 
        return (
             <div className="helpList">
                {menu}
            </div>
        );
    }

    render(){
        const {active,products,handleClose} = this.props;
        const classess = classNames({
            "second-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":active
        });
 
        return (
            <div className={classess}>
            	<Header handleGoBack={handleClose.bind(this)}>
                    <span className="btn-right" onClick={handleClose.bind(this)}>确定</span>
                </Header>
                {this.renderNav(products)}
            </div>
        );
    }
}
 

export default FilterProduct;