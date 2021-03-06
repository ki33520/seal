'use strict';

import React,{Component} from "react";
import _ from "../../../lib/lodash.es6";
import Header from "../../common/header.jsx";
import CascadeArea from "./cascadearea.jsx";

import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";

class UpdateReceiver extends Component{
    loadProvinces(){
        const {fetchProvinces} = this.props;
        fetchProvinces({
            code:""
        },"updateReceiver")
    }
    loadCities(province){
        const {fetchCities} = this.props;
        fetchCities({
            code:province
        },"updateReceiver")
    }
    loadDistricts(city){
        const {fetchDistricts} = this.props;
        fetchDistricts({
            code:city
        },"updateReceiver")
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {changeField} = this.props;
        changeField(fieldName,e.target.value,"updateReceiver");
    }
    handleAreaChange(fieldName,fieldValue){
        const {changeField} = this.props;
        changeField(fieldName,fieldValue,"updateReceiver");
    }
    handleSave(e){
        e && e.preventDefault();
        if(this.props.receiverSaving){
            return
        }
        const {receiver,saveReceiver,provinces,cities,districts,showActivityIndicator} = this.props
        showActivityIndicator()
        const {id,consignee,mobileNumber,idCard,address,isDefault,
            provinceCode,cityCode,districtCode
        } = receiver;
        const provinceName = _.result(_.findWhere(provinces,{value:provinceCode}),"label");
        const cityName = _.result(_.findWhere(cities,{value:cityCode}),"label");
        const districtName = _.result(_.findWhere(districts,{value:districtCode}),"label");
        saveReceiver({
            id,consignee,mobileNumber,idCard,address,
            isDefault:isDefault,
            provinceCode,cityCode,districtCode,
            provinceName,cityName,districtName
        })
    }
    componentWillReceiveProps(nextProps){
        const {alert,hideActivityIndicator} = this.props;
        if(nextProps.receiverSaving === false && 
            this.props.receiverSaving === true){
            hideActivityIndicator()
            if(nextProps.receiverSaved === true){
                alert("提交成功!",1500);
                setTimeout(()=>this.props.changeScene("index"),2000)
            }else{
                alert(nextProps.errMsg,1500)
            }
        }
    }
    render(){
        const {saveSuccess,alertActive,alertContent,receiver,activityIndicatorActive} = this.props
        const {
            consignee,idCard,mobileNumber,address,isDefault,
        } = (receiver === null?{}:receiver);
        return (
            <div className="receiver-form-content">
            <Header onGoBack={this.props.changeScene.bind(this,"index")}>
            <span className="title">修改收货地址</span>
            <a className="screening" href="javascript:void(null)" onClick={this.handleSave.bind(this)}>保存</a>
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
                <CascadeArea loadCities={this.loadCities.bind(this)} 
                loadDistricts={this.loadDistricts.bind(this)} 
                handleAreaChange={this.handleAreaChange.bind(this)} 
                {...this.props}/>
                <div className="receiver-form-row receiver-form-textarea-row">
                <i>*</i>
                <div className="receiver-form-label">详细地址</div>
                <div className="receiver-form-field"><textarea value={address}
                onChange={this.handleFieldChange.bind(this,"address")} 
                placeholder="请输入详细地址"/></div>
                </div>
                <div className="receiver-form-discription"></div>
            </div>
            </div>
            <Alert active={alertActive}>{alertContent}</Alert>
            <ActivityIndicator active={activityIndicatorActive} />
            </div>
        )
    }
}

export default UpdateReceiver;