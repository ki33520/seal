'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Icon from "./icon.jsx";
import dom from "../lib/dom.es6";

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }
    componentDidMount(){
        this.bindOuterEvent();
    }
    componentWillUnmount(){
        this.unbindOuterEvent();
    }
    setDropdownState(state){
        if(state === true){
            this.bindOuterEvent();
        }else{
            this.unbindOuterEvent();
        }
        this.setState({
            open:state
        },()=>{
            state && this.props.onOpen && this.props.onOpen();
            !state && this.props.onClose && this.props.onClose();
        })
    }
    bindOuterEvent(){
        dom.bindEvent(document,"click",this.handleOuterClick.bind(this));
        dom.bindEvent(document,"keyup",this.handleKeyup.bind(this));
    }
    unbindOuterEvent(){
        dom.unbindEvent(document,"click",this.handleOuterClick.bind(this));
        dom.unbindEvent(document,"keyup",this.handleKeyup.bind(this));
    }
    handleKeyup(e){
        e && e.keyCode === 27 && this.setDropdownState(false);
    }
    handleOuterClick(e){
        if(dom.hasNode(e.target,ReactDOM.findDOMNode(this)) === true){
            return false;
        }
        this.setDropdownState(false);
    }
    handleClick(e){
        e && e.preventDefault();
        this.setDropdownState(!this.state.open);
    }
    renderStatus(){
        const {minWidth,showStatus,unfoldIcon,foldIcon} = this.props;
        const caret = (<Icon 
            icon={this.state.open?foldIcon:unfoldIcon}/>);
        if(showStatus === true){
            const btnStyle = {
                width:minWidth
            };
            return (
                <button onClick={this.handleClick.bind(this)} style={btnStyle} ref="dropdownTrigger">
                <span className="dropdown-status">{this.props.title}</span>{caret}
                </button>
            )
        }else{
            return (
                <div className="fixed-caret" onClick={this.handleClick.bind(this)}>{caret}</div>
            )
        }
    }
    render(){
        const dropdownClasses = classNames(this.props.className,{
            "dropdown":this.props.showStatus,
            "dropdown-headless":!this.props.showStatus,
            active:this.state.open
        });
        const contentClasses = classNames({
            "dropdown-content":true,
            active:this.state.open
        });
        const {maxHeight} = this.props;
        const dropdownContentStyle = {
            maxHeight
        };
        return (
            <div className={dropdownClasses}>
            {this.renderStatus()}
            <div ref="dropdownContent" className={contentClasses} style={dropdownContentStyle}>{this.props.children}</div>
            </div>
        )
    }
}

Dropdown.defaultProps = {
    showStatus:true,
    foldIcon:"up-open",
    unfoldIcon:"down-open",
    onOpen:function(){},
    onClose:function(){}
}

export default Dropdown;