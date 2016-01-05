'use strict';

import React,{Component} from "react";
import ConfirmOrder from "./partial/confirmorder.jsx";
import Receiver from "../receiver/app.jsx";
import Coupon from "./partial/coupon.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx";

import {changeReceiver,changeCoupon} from "./action.es6";

class ConfirmOrderRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null
        }
    }
    componentDidMount(){
        Router({
            "/receiver":()=>{
                this.setState({
                    currentRoute:"receiver",
                    prevRoute:this.state.currentRoute
                });
            },
            "/coupon":()=>{
                this.setState({
                    currentRoute:"coupon",
                    prevRoute:this.state.currentRoute
                })
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index",
                    prevRoute:this.state.currentRoute
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
        const {currentRoute,prevRoute} = this.state;
        const receiverInitialState = {
            receivers:this.props.order.receivers,
            onCheck:this.handleChangeReceiver.bind(this),
            checkedReceiver:this.props.order.checkedReceiver
        }
        return (
            <Switcher currentRoute={currentRoute} prevRoute={prevRoute}>
            <SwitcherCase name="index"><ConfirmOrder {...this.props}/></SwitcherCase>
            <SwitcherCase name="receiver"><Receiver initialState={receiverInitialState} {...this.props}/></SwitcherCase>
            <SwitcherCase name="coupon"><Coupon {...this.props.order} onCheck={this.handleChangeCoupon.bind(this)}/></SwitcherCase>
            </Switcher>
        );    
    }
}

export default ConfirmOrderRouter;