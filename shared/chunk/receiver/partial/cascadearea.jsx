'use strict';

import React,{Component} from "react";
import Selected from "../../../component/selected/selected.jsx";

class CascadeArea extends Component{
    handleDistrictChange(districtCode){
        const {changeField} = this.props;
        changeField("districtCode",districtCode);
    }
    handleProvinceChange(provinceCode){
        const {loadCities,changeField} = this.props;
        changeField("provinceCode",provinceCode)
        loadCities(provinceCode)
    }
    handleCityChange(cityCode){
        const {loadDistricts,changeField} = this.props;
        changeField("cityCode",cityCode)
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
                <Selected options={provinces} closeOnSelect={false} 
                    maxHeight="5rem" 
                    value={province} onChange={this.handleProvinceChange.bind(this)}/>
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
            <Selected options={cities} closeOnSelect={false} 
                maxHeight="5rem" 
                value={city} onChange={this.handleCityChange.bind(this)}/>
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
            <Selected options={districts} closeOnSelect={false} 
                maxHeight="5rem" 
                value={district} onChange={this.handleDistrictChange.bind(this)}/>
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