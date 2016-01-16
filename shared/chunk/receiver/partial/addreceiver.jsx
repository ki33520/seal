'use strict';

import React,{Component} from "react";
import _ from "lodash";
import Header from "../../common/header.jsx";
import CascadeArea from "./cascadearea.jsx";

import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class AddReceiver extends Component{
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {changeField} = this.props;
        changeField(fieldName,e.target.value);
    }
    loadProvinces(){
        const {fetchProvinces} = this.props;
        fetchProvinces({
            code:""
        },"addReceiver")
    }
    loadCities(province){
        const {fetchCities} = this.props;
        fetchCities({
            code:province
        },"addReceiver")
    }
    loadDistricts(city){
        const {fetchDistricts} = this.props;
        fetchDistricts({
            code:city
        },"addReceiver")
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.active === true && prevProps.active === false &&
            this.props.provinces.length === 1){
            this.loadProvinces()
        }
    }
    handleSave(e){
        e && e.preventDefault();
        const {receiver,provinces,cities,districts,createReceiver} = this.props
        const {consignee,idCard,mobileNumber,address,isDefault,
            provinceCode,cityCode,districtCode
        } = (receiver === null?{}:receiver);
        createReceiver({
            consignee,idCard,mobileNumber,address,
            isdefault:1,
            provinceCode,
            cityCode,
            districtCode,
        })
    }
    componentWillReceiveProps(nextProps){
        const {alert} = this.props;
        if(nextProps.receiverSaving === false && 
            this.props.receiverSaving === true){
            if(nextProps.receiverSaved === true){
                alert("提交成功!",2000);
                setTimeout(()=>this.props.changeScene("index"),2500)
            }else{
                alert(nextProps.errMsg,2000)
            }
        }
    }
    render(){
        const {saveSuccess,alertActive,alertContent,receiver} = this.props
        const {
            consignee,idCard,mobileNumber,zipcode,address,isDefault,
            province,city,district,
        } = (receiver === null?{}:receiver);
        return (
            <div className="receiver-form-content">
            <Header onGoBack={this.props.changeScene.bind(this,"index")}>
            <span className="title">添加新地址</span>
            <a className="screening" href="javascript:void(0);" onClick={this.handleSave.bind(this)}>保存</a>
            </Header>
            <p className="prompt">温馨提示：收件人请使用和身份证号对应的真实姓名，否则您购买的商品将无法通过海关检查！</p>
            <div className="receiver-form">
            <div className="receiver-form-fieldset">
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">姓名</div>
                <div className="receiver-form-field"><input type="text" value={consignee}
                onChange={this.handleFieldChange.bind(this,"consignee")} 
                placeholder="建议输入您的真实姓名"
                /></div>
                </div>
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">身份证号</div>
                <div className="receiver-form-field"><input type="text" value={idCard} 
                placeholder="填写后，我们会加密处理" 
                onChange={this.handleFieldChange.bind(this,"idCard")}/></div>
                </div>
            </div>
            <div className="receiver-form-fieldset">
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">手机号码</div>
                <div className="receiver-form-field"><input type="text" value={mobileNumber} 
                placeholder="请输入您的手机号" 
                onChange={this.handleFieldChange.bind(this,"mobileNumber")}/></div>
                </div>
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">收货地址</div>
                <div className="receiver-form-field">
                    <CascadeArea loadCities={this.loadCities.bind(this)} 
                    loadDistricts={this.loadDistricts.bind(this)} 
                    {...this.props} />
                </div>
                </div>
                <div className="receiver-form-row receiver-form-textarea-row">
                <i>*</i>
                <div className="receiver-form-label">详细地址</div>
                <div className="receiver-form-field"><textarea value={address}
                onChange={this.handleFieldChange.bind(this,"address")} 
                placeholder="请输入详细地址"/></div>
                </div>
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">邮编</div>
                <div className="receiver-form-field"><input type="text" value={zipcode}
                onChange={this.handleFieldChange.bind(this,"zipcode")} 
                placeholder="请输入邮编"/></div>
                </div>
            </div>
            </div>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default AddReceiver;