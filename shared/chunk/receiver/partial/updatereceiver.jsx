'use strict';

import React,{Component} from "react";
import _ from "lodash";
import Header from "../../common/header.jsx";
import CascadeArea from "../../common/cascadearea.jsx";
import {fetchProvinces,fetchCities,fetchDistricts,saveReceiver,changeField} from "../action.es6";

import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class UpdateReceiver extends Component{
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField(fieldName,e.target.value));
    }
    loadProvinces(){
        const {dispatch} = this.props;
        dispatch(fetchProvinces("/cascadearea",{
            code:"",
            isprovince:true
        }));
    }
    loadCities(province){
        const {dispatch} = this.props;
        dispatch(fetchCities("/cascadearea",{
            code:province,
            isprovince:false
        }))
    }
    loadDistricts(city){
        const {dispatch} = this.props;
        dispatch(fetchDistricts("/cascadearea",{
            code:city,
            isprovince:false
        }))
    }
    handleSave(e){
        e && e.preventDefault();
        const {receiver,dispatch,provinces,cities,districts} = this.props
        const {id,consignee,mobile,zipcode,address,isDefault,
            province,city,district
        } = receiver;
        const selectedProvince = _.findWhere(provinces,{value:province});
        const selectedCity = _.findWhere(cities,{value:city});
        const selectedDistrict = _.findWhere(districts,{value:district});
        dispatch(saveReceiver({
            id,consignee,mobile,zipcode,address,
            isdefault:isDefault,
            province:selectedProvince.label,
            provincecode:selectedProvince.value,
            city:selectedCity.label,
            citycode:selectedCity.value,
            district:selectedDistrict.label,
            districtcode:selectedDistrict.value
        }))
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props;
        if(nextProps.receiverSaving === false && 
            this.props.receiverSaving === true){
            if(nextProps.receiverSaved === true){
                dispatch(alert("提交成功!",2000));
                setTimeout(()=>window.location.replace("/receiver"),2500)
            }else{
                dispatch(alert(nextProps.errMsg,2000))
            }
        }
    }
    render(){
        const {saveSuccess,alertActive,alertContent,receiver} = this.props
        const {
            consignee,mobile,zipcode,address,isDefault,
            province,city,district,
        } = receiver;
        return (
            <div className="receiver-form-content">
            <Header>
            <span className="title">修改收货地址</span>
            <a className="screening" href="javascript:void(0);">保存</a>
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
                <div className="receiver-form-field"><input type="text" value={mobile} 
                placeholder="填写后，我们会加密处理" 
                onChange={this.handleFieldChange.bind(this,"mobile")}/></div>
                </div>
            </div>
            <div className="receiver-form-fieldset">
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">手机号码</div>
                <div className="receiver-form-field"><input type="text" value={mobile} 
                placeholder="请输入您的手机号" 
                onChange={this.handleFieldChange.bind(this,"mobile")}/></div>
                </div>
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">收货地址</div>
                <div className="receiver-form-field">
                    <CascadeArea {...this.props} 
                    changeField={changeField}
                    loadProvinces={this.loadProvinces.bind(this)} 
                    loadCities={this.loadCities.bind(this)} 
                    loadDistricts={this.loadDistricts.bind(this)}/>
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

export default UpdateReceiver;