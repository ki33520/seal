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
    }
    toggleVisble(){
        const {relative} = this.props;
        const scrollTop = relative?dom.scrollTop(this.scrollNode)
        :dom.scrollTop();
        if(scrollTop > 50){
            this.setState({active:true});
        }else{
            this.setState({active:false});
        }
    }
    componentDidMount(){
        const {relative} = this.props;
        // console.log(dom.scrollNode(ReactDOM.findDOMNode(this)))
        this.scrollNode = relative?ReactDOM.findDOMNode(this).parentNode:window;
        dom.bindEvent(this.scrollNode,'scroll',_.debounce(this.toggleVisble.bind(this),100))
    }
    componentWillUnmount(){
        dom.unbindEvent(this.scrollNode,'scroll',_.debounce(this.toggleVisble.bind(this),100))
    }
    backToTop(){
        smoothScroll(this.scrollNode);
    }
    render(){
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
}

GoTop.defaultProps = {
    relative:false
}

export default GoTop;