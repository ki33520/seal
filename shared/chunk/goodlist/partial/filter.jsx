'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import classNames from "classnames";

class Filter extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked:{},
            values:[]
        }
    }
 
    handleSave(){
        let {values} = this.state;
        this.props.handleClose(values);
    }

    handleCheck(key,value){
        let {checked,values} = this.state;
        let index = values.indexOf(value);
        checked[key] = !checked[key];

        if(index === -1){
            values.push(value);
        }else{
            values.splice(index,1);
        }
        
        this.setState({
            checked,
            values
        });
    }

    renderNav(names){
        if(!names || names.length<1){
            return '暂无分类';
        }
        var menu = names.map((item,i)=>{
            const key="nav-"+i;
            const checked = classNames("iconfont",{
                "icon-check": this.state.checked[key]
            });
            return (
                <dl onClick={this.handleCheck.bind(this,key,item.id)} key={key}>
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
        const {active,names,handleClose} = this.props;
        const classess = classNames({
            "second-slider":true,
            "rollIn-animate":true,
            "rollIn-slideLeft":active
        });
 
        return (
            <div className={classess}>
            	<Header handleGoBack={handleClose.bind(this)}>
                    <span className="btn-right" onClick={this.handleSave.bind(this)}>确定</span>
                </Header>
                {this.renderNav(names)}
            </div>
        );
    }
}
 

export default Filter;