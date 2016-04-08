'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "./icon.jsx";

class Dialog extends Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.active !== this.props.active){
            if(nextProps.active === true){
                document.body.style["overflow-y"] = "hidden";
            }else{
                document.body.style["overflow-y"] = "";
            }
        }
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
                {onlyConfirm?null:<button onClick={this.handleCancel.bind(this)}>{this.props.cancelText}</button>}
                <button onClick={this.handleConfirm.bind(this)}>{this.props.confirmText}</button>
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
    confirmText:"确定",
    cancelText:"取消",
    onlyConfirm:false,
    onConfrim:()=>{},
    onCancel:()=>{}
}

export default Dialog;