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
            <Header title="编辑收货地址"><span><a href="javascript:void(null)" onClick={this.handleSave.bind(this)}>保存</a></span></Header>
            <div className="receiver-form">
            <div className="receiver-form-fieldset">
                <div className="receiver-form-row">
                <div className="receiver-form-label">姓名</div>
                <div className="receiver-form-field"><input type="text" value={consignee}
                onChange={this.handleFieldChange.bind(this,"consignee")}/></div>
                </div>
                <div className="receiver-form-row">
                <div className="receiver-form-label">手机</div>
                <div className="receiver-form-field"><input type="text" value={mobile}
                onChange={this.handleFieldChange.bind(this,"mobile")}/></div>
                </div>
                <CascadeArea {...this.props} 
                changeField={changeField}
                loadProvinces={this.loadProvinces.bind(this)} 
                loadCities={this.loadCities.bind(this)} 
                loadDistricts={this.loadDistricts.bind(this)}/>
                <div className="receiver-form-row">
                <div className="receiver-form-label">邮编</div>
                <div className="receiver-form-field"><input type="text" value={zipcode}
                onChange={this.handleFieldChange.bind(this,"zipcode")}/></div>
                </div>
            </div>
            <div className="receiver-form-fieldset">
                <div className="receiver-form-row receiver-form-textarea-row">
                <div className="receiver-form-label">详细地址</div>
                <div className="receiver-form-field"><textarea value={address}
                onChange={this.handleFieldChange.bind(this,"address")}/></div>
                </div>
            </div>
            </div>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default UpdateReceiver;