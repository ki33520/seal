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
                <Selected options={provinces} 
                    maxHeight="5rem" 
                    value={province} onChange={this.handleProvinceChange.bind(this)}/>
            )
        }
        return null;
    }
    renderCity(){
        const {cities,receiver} = this.props;
        const city = receiver === null?"":receiver.cityCode;
        return (
            <Selected options={cities} 
                maxHeight="5rem" 
                value={city} onChange={this.handleCityChange.bind(this)}/>
        )
    }
    renderDistrict(){
        const {districts,receiver} = this.props;
        const district = receiver === null?"":receiver.districtCode;
        // console.log('district',districts)
        return (
            <Selected options={districts} 
                maxHeight="5rem" 
                value={district} onChange={this.handleDistrictChange.bind(this)}/>
        )
    }
    render(){
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