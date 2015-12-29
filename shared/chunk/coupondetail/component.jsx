'use strict';
import React,{Component} from "react";
import CouponDetail from "./partial/detail.jsx";
import CouponRules from "./partial/rules.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

class CouponDetailRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:"index"
        }
    }
    componentDidMount(){
        Router({
            "/rules":()=>{
                this.setState({
                    currentRoute:"rules"
                });
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index"
                });
            }
        }).init("/");
    }
    render(){
        const {currentRoute} = this.state;
        var currentView = null;
        if(currentRoute === "index"){
            currentView =  (
                <CouponDetail {...this.props} key={currentRoute}/>
            )
        }else if(currentRoute === "rules"){
            currentView =  (
                <CouponRules {...this.props} key={currentRoute}/>
            )
        }
        const transitionName = currentRoute !== 'index'?'moveRight':'moveLeft';
        return (
            <TransitionGroup component="div" transitionName={transitionName}>
                {currentView}
            </TransitionGroup>
        );
    }
}

export default CouponDetailRouter;