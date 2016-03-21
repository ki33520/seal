'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import dom from "../lib/dom.es6";
import {smoothScroll} from "../lib/dom.es6";
import Icon from "./icon.jsx";

class GoTop extends Component{
    constructor(props){
        super(props);
        this.state = {
            active:false
        };
        this.scrollNode = window
    }
    toggleVisble(scrollTop){
        if(scrollTop > 50){
            this.setState({active:true})
        }else{
            this.setState({active:false});
        }
    }
    handleScroll(){
        const scrollTop = dom.scrollTop(this.scrollNode)
        this.toggleVisble(scrollTop)
        this.props.onScroll(this.scrollNode)
    }
    componentDidMount(){
        if(this.props.relative){
            this.scrollNode = ReactDOM.findDOMNode(this.refs["scrollNode"])
        }
        dom.bindEvent(this.scrollNode,'scroll',_.debounce(this.handleScroll.bind(this),10))
    }
    componentWillUnmount(){
        dom.unbindEvent(this.scrollNode,'scroll',_.debounce(this.handleScroll.bind(this),10))
    }
    backToTop(){
        smoothScroll(this.scrollNode);
    }
    renderButton(){
        const classes = classNames({
            "back-to-top":true,
            "active":this.state.active
        });
        return (
            <div className={classes}>
                <a href={null} onClick={this.backToTop.bind(this)}>
                <Icon icon="up"/>
                </a>
            </div>
        )        
    }
    render(){
        if(this.props.relative){
            return (
                <div className="back-to-top-container">
                {this.renderButton()}
                <div className="back-to-top-inner" ref="scrollNode">
                {this.props.children}
                </div>
                </div>
            )
        }
        return this.renderButton()
    }
}

GoTop.defaultProps = {
    relative:false,
    onScroll:()=>{}
}

export default GoTop;