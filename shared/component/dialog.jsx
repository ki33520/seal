'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "./icon.jsx";

class Dialog extends Component{
    constructor(props){
        super(props);
    }
    handleConfirm(e){
        e && e.preventDefault();
        this.props.onConfrim()
    }
    handleCancel(e){
        e && e.preventDefault();
        this.props.onCancel()
    }
    renderTitle(){
        return <div className="dialog-title"><Icon icon="warn"/>{this.props.title}</div>
    }
    renderButtons(){
        const {onlyConfirm} = this.props;
        return (
            <div className="dialog-btns">
                {onlyConfirm?null:<button onClick={this.handleCancel.bind(this)}>取消</button>}
                <button onClick={this.handleConfirm.bind(this)}>确定</button>
            </div>
        )
    }
    render(){
        const classes = classNames("dialog-container",{
            active:this.props.active
        })
        return (
            <div className={classes}>
                <div className="dialog">
                {this.renderTitle()}
                <div className="dialog-content">{this.props.children}</div>
                {this.renderButtons()}
                </div>
            </div>
        )
    }
}

Dialog.defaultProps = {
    active:false,
    title:'提示',
    onlyConfirm:false,
    onConfrim:()=>{},
    onCancel:()=>{}
}

export default Dialog;