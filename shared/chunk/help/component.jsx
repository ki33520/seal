'use strict'

import React,{Component} from "react";
import HelpIndex from "./partial/helpindex.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

class helpMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            memberInfo: props.memberInfo,
            currentRoute: "index"
        }
    }
    componentDidMount(){
        Router({
            "/":()=>{
                this.setState({
                    currentRoute:"index"
                });
            }
        }).init("/");
    }
    render(){
        console.log(this.props)
        const {currentRoute} = this.state;
        var currentView = null;
        if(currentRoute === "index"){
            currentView =  (
                <HelpIndex {...this.props} key={currentRoute}/>
            )
        }
        const transitionName = currentRoute !== 'index'?'moveRight':'moveLeft';
        return (
            <TransitionGroup component="div" transitionName={transitionName} transitionLeave={false}>
                {currentView}
            </TransitionGroup>
        );
    }
}

export default helpMain;