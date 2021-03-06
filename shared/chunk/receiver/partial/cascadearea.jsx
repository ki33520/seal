'use strict';

import React,{Component} from "react";
import Selected from "../../../component/selected/selected.jsx";

class CascadeArea extends Component{
    handleDistrictChange(e){
        const districtCode = e.target.value
        const {handleAreaChange} = this.props;
        handleAreaChange("districtCode",districtCode);
    }
    handleProvinceChange(e){
        const provinceCode = e.target.value
        const {loadCities,handleAreaChange} = this.props;
        handleAreaChange("provinceCode",provinceCode)
        handleAreaChange("cityCode","")
        handleAreaChange("districtCode","")
        loadCities(provinceCode)
    }
    handleCityChange(e){
        const cityCode = e.target.value
        const {loadDistricts,handleAreaChange} = this.props;
        handleAreaChange("cityCode",cityCode)
        handleAreaChange("districtCode","")
        loadDistricts(cityCode)
    }
    renderProvince(){
        const {provinces,receiver} = this.props;
        const province = receiver === null?"":receiver.provinceCode;
        if(provinces.length > 1){
            return (
                <div className="receiver-form-row">
                <i>*</i>
                <div className="receiver-form-label">省份</div>
                <div className="receiver-form-field">
                <select value={province} onChange={this.handleProvinceChange.bind(this)}>
                {provinces.map((option,i)=>{
                    return <option value={option.value} key={i}>{option.label}</option>
                })}
                </select>
                </div>
                </div>
            )
        }
        return null;
    }
    renderCity(){
        const {cities,receiver} = this.props;
        const city = receiver === null?"":receiver.cityCode;
        return (
            <div className="receiver-form-row">
            <i>*</i>
            <div className="receiver-form-label">城市</div>
            <div className="receiver-form-field">
                <select value={city} onChange={this.handleCityChange.bind(this)}>
                {cities.map((option,i)=>{
                    return <option value={option.value} key={i}>{option.label}</option>
                })}
                </select>
            </div>
            </div>
        )
    }
    renderDistrict(){
        const {districts,receiver} = this.props;
        const district = receiver === null?"":receiver.districtCode;
        return (
            <div className="receiver-form-row">
            <i>*</i>
            <div className="receiver-form-label">区县</div>
            <div className="receiver-form-field">
                <select value={district} onChange={this.handleDistrictChange.bind(this)}>
                {districts.map((option,i)=>{
                    return <option value={option.value} key={i}>{option.label}</option>
                })}
                </select>
            </div>
            </div>
        )
    }
    render(){
        if(this.props.receiver === null){
            // return null
        }
        return (
            <div className="cascade-area">
            {this.renderProvince()}
            {this.renderCity()}
            {this.renderDistrict()}
            </div>
        )
    }
}

export default CascadeArea;