'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import Icon from "../../../component/icon.jsx";
import Dialog from "../../../component/dialog.jsx";
import GoTop from "../../../component/gotop.jsx";
import Radio from "../../../component/form/radio.jsx";
import {formateIDCard} from "../../../lib/helper.es6";
import _ from "../../../lib/lodash.es6";

import Alert from "../../../component/alert.jsx";

class Receiver extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogOnConfirm:null,
            alertActive:false,
            alertContent:"alert"
        }
    }
    handleCheck(receiver){
        const {onCheck} = this.props
        this.props.selectReceiver(receiver)
        onCheck(receiver)
        this.props.receiverByUser.changeScene("index")
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        })
    }
    handleDelete(receiver){
        const {deleteReceiver,checkedReceiver,receivers} = this.props;
        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog()
                deleteReceiver({id:receiver.id})
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.receiverDeleted === true && this.props.receiverDeleted === false){
            const {checkedReceiver,checkable} = this.props;
            const {receivers} = nextProps;
            if(checkable && _.some(receivers,{id:checkedReceiver.id}) === false){
                this.props.onCheck(receivers.length > 0 ?receivers[0]:null)
                this.props.selectReceiver(receivers.length > 0 ?receivers[0]:null)
            }
        }
        if(nextProps.alertActive !== this.props.alertActive){
            this.setState({
                alertActive:nextProps.alertActive,
                alertContent:nextProps.alertContent
            })
        }
    }
    handleCheckableGoBack(){
        if(this.props.checkedReceiver){
            this.handleCheck(this.props.checkedReceiver)
        }else{
            this.props.receiverByUser.changeScene("index")
        }
    }
    setReceiverDefault(receiver){
        const {setDefault} = this.props;
        setDefault({id:receiver.id})
    }
    renderReceivers(){
        const {receivers,checkable,checkedReceiver} = this.props;
        if(receivers.length > 0){
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
                        <p>{formateIDCard(receiver.idCard)}<em>实名</em></p>
                        <p>{receiver.provinceName+receiver.cityName+receiver.districtName+receiver.address}</p>
                        {checkbox}
                        <div className="toolsArea">
                            {receiver.isDefault !== 1?(
                            <em onClick={this.setReceiverDefault.bind(this,receiver)}>设为默认地址</em>):null}
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
                <img src="/client/asset/images/empty_address.png" />
                <span>快来添加您的收货地址吧！</span>
                <a href="javascript:void(null)" className="empty_btn"
                onClick={this.props.changeScene.bind(this,"addreceiver")}>添加新地址</a>
            </div>
        );
    }
    handleAddReceiver(){
            if(this.props.receivers.length >= 10){
                this.props.alert("收货地址不能超过10个!",2000)
            }else{
                this.props.changeScene("addreceiver")
            }
    }
    render(){
        return (
            <div className="receiver-content">
            {this.props.checkable?(<Header onGoBack={this.handleCheckableGoBack.bind(this)}>选择收货地址</Header>):(
            <Header>我的地址</Header>)}
            <div className="receiver-inner">
                <div className="selectArea">
                {this.renderReceivers()}
                </div>
            </div>
            {this.props.receivers.length > 0?(
            <div className="addBtns">
                <a href="javascript:void(null)" 
                onClick={this.handleAddReceiver.bind(this)} className="addBtn">添加新地址</a>
            </div>
            ):null}
            <Dialog active={this.state.dialogActive} 
            onCancel={this.toggleDialog.bind(this)}
            onConfrim={this.state.dialogOnConfirm} 
            >确定要删除吗?</Dialog>
            <Alert active={this.props.alertActive}>{this.props.alertContent}</Alert>
            </div>
        )
    }
}

Receiver.defaultProps = {
    checkable:false,
    checkedReceiver:null,
    alertActive:false,
    alertContent:"",
    onCheck:function(){}
};

export default Receiver;