'use strict';

import React,{Component} from "react";
import _ from "lodash";
import ConfirmOrder from "./partial/confirmorder.jsx";
import Receiver from "../receiver/app.jsx";
import Coupon from "./partial/coupon.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

import {changeReceiver,changeCoupon,fetchShipFee} from "./action.es6";

class ConfirmOrderRouter extends Component{
    handleChangeReceiver(receiver){
        const {dispatch} = this.props;
        dispatch(changeReceiver(receiver));
        if(receiver){
            dispatch(fetchShipFee({
                provinceCode:receiver.provinceCode,
                cityCode:receiver.cityCode,
                districtCode:receiver.districtCode
            }))
        }
    }
    handleChangeCoupon(coupon){
        const {dispatch} = this.props;
        dispatch(changeCoupon(coupon));
    }
    handleSceneChange(currentScene,param,prevScene){
        // switch(currentScene){
            // case "receiver":
                // this.refs["receiver"].
        // }
    }
    render(){
        let {receivers,checkedReceiver} = this.props.order
        if(checkedReceiver){
            if(_.some(receivers,{id:checkedReceiver.id}) === false){
                receivers.push(checkedReceiver)
            }
            receivers = _.sortBy(receivers,"id")
        }
        const receiverInitialState = {
            receivers,
            checkable:true,
            defaultScene:receivers.length === 0?"addreceiver":"index",
            onCheck:this.handleChangeReceiver.bind(this),
            checkedReceiver
        }
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
            <Scene name="index"><ConfirmOrder {...this.props}/></Scene>
            <Scene name="receiver"><Receiver initialState={receiverInitialState} {...this.props}/></Scene>
            <Scene name="coupon"><Coupon {...this.props.order} onCheck={this.handleChangeCoupon.bind(this)}/></Scene>
            </SceneGroup>
        );    
    }
}

export default ConfirmOrderRouter;