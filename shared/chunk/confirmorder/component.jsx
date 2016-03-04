'use strict';

import React,{Component} from "react";
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
            onCheck:this.handleChangeReceiver.bind(this),
            checkedReceiver
        }
        return (
            <SceneGroup>
            <Scene name="index"><ConfirmOrder {...this.props}/></Scene>
            <Scene name="receiver"><Receiver initialState={receiverInitialState} {...this.props}/></Scene>
            <Scene name="coupon"><Coupon {...this.props.order} onCheck={this.handleChangeCoupon.bind(this)}/></Scene>
            </SceneGroup>
        );    
    }
}

export default ConfirmOrderRouter;