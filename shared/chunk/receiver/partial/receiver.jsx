'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import Icon from "../../../component/icon.jsx";
import Checkbox from "../../../component/form/checkbox.jsx";

class Receiver extends Component{
    handleCheck(receiver,checked){
        const {onCheck} = this.props
        onCheck(receiver)
    }
    renderReceivers(){
        const {receivers,checkable,checkedReceiver} = this.props;
        if(receivers !== null){
            var receiversContent;
            receiversContent = receivers.map((receiver,i)=>{
                const key = "receiver-"+i;
                const checked = checkedReceiver !== null?(checkedReceiver.id === receiver.id):false;
                const checkbox = checkable?(<Checkbox checked={checked} 
                onChange={this.handleCheck.bind(this,receiver)}/>):null;
                return (
                    <div className="receiver" key={key}>
                    <div className="receiver-header">{checkbox}<label>{receiver.name}</label><b>{receiver.mobileNumber}</b><em>默认地址</em></div>
                    <div className="receiver-detail">
                    <div>{receiver.provinceName+receiver.cityName+receiver.districtName+receiver.address}</div>
                    </div>
                    <div className="receiver-footer">
                    <a href={"#/updatereceiver/"+receiver.id}><Icon icon="help-circled" />修改</a>
                    <a><Icon icon="info-circled" />删除</a>
                    </div>
                    </div>
                )
            });
            return receiversContent;
        }
        return null;
    }
    render(){
        return (
            <div className="receiver-content">
            <Header title="收货地址"/>
            <div className="receivers">
            {this.renderReceivers()}
            <div className="add-receiver">
            <a href="#/addreceiver"><Icon icon="plus"/>添加新地址</a>
            </div>
            </div>
            </div>
        )
    }
}

Receiver.defaultProps = {
    checkable:true,
    checkedReceiver:null,
    onCheck:function(){}
};

export default Receiver;