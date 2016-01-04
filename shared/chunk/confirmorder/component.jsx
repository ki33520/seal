'use strict';

import React,{Component} from "react";
import ConfirmOrder from "./partial/confirmorder.jsx";
import Receiver from "../receiver/app.jsx";
import Coupon from "./partial/coupon.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

import {changeReceiver,changeCoupon} from "./action.es6";

class ConfirmOrderRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:"index"
        }
    }
    componentDidMount(){
        Router({
            "/receiver":()=>{
                this.setState({
                    currentRoute:"receiver"
                });
            },
            "/coupon":()=>{
                this.setState({
                    currentRoute:"coupon"
                })
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index"
                });
            }
        }).init("/");
    }
    handleChangeReceiver(receiver){
        const {dispatch} = this.props;
        dispatch(changeReceiver(receiver));
    }
    handleChangeCoupon(coupon){
        const {dispatch} = this.props;
        dispatch(changeCoupon(coupon));
    }
    render(){
        const {currentRoute} = this.state;
        var currentView = null;
        if(currentRoute === "index"){
            currentView =  (
                <ConfirmOrder {...this.props} key={currentRoute}/>
            )
        }else if(currentRoute === "receiver"){
            const initialState = {
                receivers:this.props.order.receivers,
                onCheck:this.handleChangeReceiver.bind(this),
                checkedReceiver:this.props.order.checkedReceiver
            }
            // console.log('receivers',initialState)
            currentView =  (
                <Receiver initialState={initialState} key={currentRoute}/>
            )
        }else if(currentRoute === "coupon"){
            currentView =  (
                <Coupon {...this.props.order} onCheck={this.handleChangeCoupon.bind(this)} key={currentRoute}/>
            )
            
        }
        const transitionName = currentRoute !== 'index'?'moveRight':'moveLeft';
        return (
            <TransitionGroup component="div" transitionName={transitionName} 
            transitionLeave={false} 
            transitionEnterTimeout={300} transitionLeaveTimeout={100}>
            {currentView}
            </TransitionGroup>
        );
    }
}

export default ConfirmOrderRouter;