'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import Icon from "../../../component/icon.jsx";
import Radio from "../../../component/form/radio.jsx";
import _ from "lodash";

class Receiver extends Component{
    handleCheck(receiver){
        const {onCheck} = this.props
        onCheck(receiver)
        this.props.receiverByUser.changeScene("index")
    }
    handleDelete(receiver){
        const {deleteReceiver} = this.props;
        deleteReceiver({
            id:receiver.id
        })
    }
    handleCheckableGoBack(){
        const {checkedReceiver,receivers,onCheck} = this.props
        const receiver = _.findWhere(receivers,{id:checkedReceiver.id})
        onCheck(receiver)
        // console.log("checkedReceiver",receiver)
        this.props.receiverByUser.changeScene("index")
    }
    renderReceivers(){
        const {receivers,checkable,checkedReceiver} = this.props;
        if(receivers){
            return receivers.map((receiver,i)=>{
                const key = "receiver-"+i;
                const checked = checkedReceiver !== null?(checkedReceiver.id === receiver.id):false;
                const checkbox = checkable?(<Radio name="receiver" checked={checked} checkedIcon="checkbox-full" uncheckIcon="checkbox-empty"
                onChange={this.handleCheck.bind(this,receiver)}/>):null;
                const isDefault = receiver.isDefault === 1 ? <i>【默认】</i> : <i></i>;
                return (
                    <div className="order-time" key={key}>
                        <p>{receiver.consignee}<span className="mobNum">{receiver.mobileNumber}</span>
                        {isDefault}
                        </p>
                        <p>{receiver.idCard}<em>实名</em></p>
                        <p>{receiver.provinceName+receiver.cityName+receiver.districtName+receiver.address}</p>
                        {checkbox}
                        <div className="toolsArea">
                            <span className="pen"><a href="javascript:void(null)" 
                            onClick={this.props.changeScene.bind(this,"updatereceiver",{id:receiver.id})}><em></em>修改</a></span>
                            <span className="del" onClick={this.handleDelete.bind(this,receiver)}><em></em>删除</span>
                        </div>
                    </div>
                )
            });
        }
        return (
            <div className="empty">
                <img src="/client/images/empty_address.png" />
                <span>快来添加您的收货地址吧！</span>
                <a href="javascript:void(null)" className="empty_btn"
                onClick={this.props.changeScene.bind(this,"addreceiver")}>添加新地址</a>
            </div>
        );
    }
    render(){
        return (
            <div className="receiver-content">
            {this.props.checkable?(<Header onGoBack={this.handleCheckableGoBack.bind(this)}>选择收货地址</Header>):(
            <Header>收货地址</Header>)}
            <div className="selectArea">
            {this.renderReceivers()}
            </div>
            <div className="addBtns">
                <a href="javascript:void(null)" 
                onClick={this.props.changeScene.bind(this,"addreceiver")} className="addBtn">添加新地址</a>
            </div>
            </div>
        )
    }
}

Receiver.defaultProps = {
    checkable:false,
    checkedReceiver:null,
    onCheck:function(){}
};

export default Receiver;