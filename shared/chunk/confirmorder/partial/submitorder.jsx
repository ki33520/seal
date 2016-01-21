'use strict';

import React,{Component} from "react";
import moment from "moment";
import {getSignatureByParam} from "../../../lib/util.es6";

class SubmitOrder extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {cashierParam} = this.props.order;
        cashierParam = cashierParam || {}
        return (
            <div className="confirmBtns">
                <a href="javascript:void(0);" className="confirm_btn" 
                onClick={this.props.onSubmit}>提交订单</a>
                <form action="http://cashier.e9448.com/cashier/v1/cashier" method="POST" ref="submitForm">
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