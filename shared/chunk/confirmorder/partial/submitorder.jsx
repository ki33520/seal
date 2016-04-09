'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import moment from "moment";
import {getSignatureByParam} from "../../../lib/util.es6";

class SubmitOrder extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {submiting} = this.props
        let {cashierParam,cashier} = this.props.order;
        cashierParam = cashierParam || {}
        const classes = classNames("confirm_btn",{
            submiting
        })
        return (
            <div className="confirmBtns">
                <a href="javascript:void(0);" className={classes} 
                onClick={this.props.onSubmit}>{submiting?"提交中...":"提交订单"}</a>
                <form action={cashier+"/cashier/v1/cashier"} method="POST" id="submitForm">
                    <input type="hidden" name="appId" value={cashierParam.appId} />
                    <input type="hidden" name="channel" value={cashierParam.channel} />
                    <input type="hidden" name="openId" value={cashierParam.openId} />
                    <input type="hidden" name="terminalType" value={cashierParam.terminalType} />
                    <input type="hidden" name="message" value={cashierParam.message} />
                    <input type="hidden" name="t" value={cashierParam.t} />
                    <input type="hidden" name="h" value={cashierParam.h} />
                </form>
            </div>
        )
    }
}

export default SubmitOrder;