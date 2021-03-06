'use strict';

import React,{Component} from "react";
import _ from "../../../lib/lodash.es6";
import Header from "../../common/header.jsx";
import CascadeArea from "./cascadearea.jsx";

import {alert} from "../../common/action.es6";
import ActivityIndicator from "../../common/activityindicator.jsx";
import Alert from "../../../component/alert.jsx";
// import noBounceScroll from "../../../lib/dom/nobounce-scroll.es6";


class AddReceiver extends Component{
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {changeField} = this.props;
        changeField(fieldName,e.target.value,"addReceiver");
    }
    handleAddressChange(e){
        e && e.preventDefault()
        const {changeField} = this.props
        if(e.target.value.length > 60){
            this.props.alert("详细地址过长!",1500)
            return false
        }
        changeField("address",e.target.value,"addReceiver")
    }
    handleAreaChange(fieldName,fieldValue){
        const {changeField} = this.props;
        changeField(fieldName,fieldValue,"addReceiver");
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
    componentDidMount(nextProps){
        if(this.props.active === true && this.props.provinces.length === 1){
            this.loadProvinces()
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.active === true && prevProps.active === false &&
            this.props.provinces.length === 1){
            this.loadProvinces()
        }
    }
    handleSave(e){
        e && e.preventDefault();
        if(this.props.receiverSaving){
            return
        }
        const {receiver,provinces,cities,districts,createReceiver,showActivityIndicator} = this.props
        showActivityIndicator()
        const {consignee,idCard,mobileNumber,address,isDefault,
            provinceCode,cityCode,districtCode
        } = (receiver === null?{}:receiver);
        const provinceName = _.result(_.findWhere(provinces,{value:provinceCode}),"label");
        const cityName = _.result(_.findWhere(cities,{value:cityCode}),"label");
        const districtName = _.result(_.findWhere(districts,{value:districtCode}),"label");
        createReceiver({
            consignee,idCard,mobileNumber,address,
            isDefault:0,
            provinceCode,cityCode,districtCode,
            provinceName,cityName,districtName
        })
    }
    componentWillReceiveProps(nextProps){
        const {alert,hideActivityIndicator,changeField} = this.props;
        if(nextProps.receiverSaving === false && 
            this.props.receiverSaving === true){
            hideActivityIndicator()
            if(nextProps.receiverSaved === true){
                alert("提交成功!",1500);
                setTimeout(()=>{
                    const {onCheck,receiver,checkable} = this.props
                    changeField("consignee","","addReceiver")
                    changeField("idCard","","addReceiver")
                    changeField("mobileNumber","","addReceiver")
                    changeField("address","","addReceiver")
                    changeField("provinceCode","","addReceiver")
                    changeField("cityCode","","addReceiver")
                    changeField("districtCode","","addReceiver")
                    if(checkable){
                        this.props.selectReceiver(receiver)
                        onCheck(receiver)
                        // console.log('receiver',receiver)
                        this.props.receiverByUser.changeScene("index")
                        this.props.resetScene();
                    }else{
                        this.props.changeScene("index")
                    }
                },2000)
                // setTimeout(()=>this.props.changeScene("index"),2500)
            }else{
                alert(nextProps.errMsg,1500)
            }
        }
    }
    render(){
        const {saveSuccess,alertActive,alertContent,
            activityIndicatorActive,receiver} = this.props
        const {
            consignee,idCard,mobileNumber,zipcode,address,isDefault,
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
                <CascadeArea loadCities={this.loadCities.bind(this)} 
                loadDistricts={this.loadDistricts.bind(this)} 
                handleAreaChange={this.handleAreaChange.bind(this)} 
                {...this.props} />
                <div className="receiver-form-row receiver-form-textarea-row">
                <i>*</i>
                <div className="receiver-form-label">详细地址</div>
                <div className="receiver-form-field"><textarea value={address}
                onChange={this.handleAddressChange.bind(this)} 
                placeholder="请输入详细地址"/></div>
                </div>
                <div className="receiver-form-discription"></div>
            </div>
            </div>
            <ActivityIndicator active={activityIndicatorActive}/>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default AddReceiver;