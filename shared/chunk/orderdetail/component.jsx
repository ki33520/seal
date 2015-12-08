'use strict';

import React,{Component} from "react";
import OrderDetail from "./partial/orderdetail.jsx";
import Logistics from "./partial/logistics.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

class OrderDetailRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:"index"
        }
    }
    componentDidMount(){
        Router({
            "/logistics":()=>{
                this.setState({
                    currentRoute:"logistics"
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
                <OrderDetail {...this.props} key={currentRoute}/>
            )
        }else if(currentRoute === "logistics"){
            currentView =  (
                <Logistics {...this.props} key={currentRoute}/>
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

export default OrderDetailRouter;