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
                    <div className="order-time" key={key}>
                        <p>{receiver.name}<span className="mobNum">{receiver.mobileNumber}</span>
                        <i>【默认】</i>
                        </p>
                        <p>433101**********1011<em>实名</em></p>
                        <p>{receiver.provinceName+receiver.cityName+receiver.districtName+receiver.address}</p>
                        <div className="toolsArea">
                            <span className="pen"><a href={"#/updatereceiver/"+receiver.id}><em></em>修改</a></span>
                            <span className="del"><em></em>删除</span>
                        </div>
                    </div>
                )
            });
            return receiversContent;
        }
        return (
            <div className="empty">
                <img src="/client/images/empty_address.png" />
                <span>快来添加您的收货地址吧！</span>
                <a href="#" className="empty_btn">添加新地址</a>
            </div>
        );
    }
    render(){
        return (
            <div className="receiver-content">
            <Header>收货地址</Header>
            <div className="selectArea">
            {this.renderReceivers()}
            </div>
            <div className="addBtns">
                <a href="#/addreceiver" className="addBtn">添加新地址</a>
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