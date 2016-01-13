'use strict';

import React,{Component} from "react";
import Selected from "../../../component/selected/selected.jsx";

class CascadeArea extends Component{
    loadProvinces(){
        const {fetchProvinces} = this.props;
        fetchProvinces({
            code:""
        })
    }
    loadCities(province){
        const {fetchCities} = this.props;
        fetchCities({
            code:province
        })
    }
    loadDistricts(city){
        const {fetchDistricts} = this.props;
        fetchDistricts({
            code:city
        })
    }
    componentDidMount(){
        if(this.props.active){
            this.loadProvinces()
        }
    }
    componentDidUpdate(prevProps,prevState){
        const {receiver,active} = this.props;
        const province = receiver === null?"":receiver.provinceCode;
        const city = receiver === null?"":receiver.cityCode;
        if(prevProps.provinces.length === 1 && 
        this.props.provinces.length > 1 && province){
            this.loadCities(province);
            // console.log(prevProps.provinces,province)
        }
        if(prevProps.cities.length === 1 && 
        this.props.cities.length > 1 && city){
            this.loadDistricts(city);
        }
    }
    handleProvinceChange(province){
        const {changeField} = this.props;
        changeField("province",province);
        this.loadCities(province);
    }
    handleCityChange(city){
        const {changeField} = this.props;
        changeField("city",city);
        this.loadDistricts(city)
    }
    handleDistrictChange(district){
        const {changeField} = this.props;
        changeField("district",district);
    }
    renderProvince(){
        const {provinces,receiver} = this.props;
        const province = receiver === null?"":receiver.provinceCode;
        if(provinces.length > 1){
            return (
                <Selected options={provinces} 
                    maxHeight="8rem" 
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
                maxHeight="8rem" 
                value={city} onChange={this.handleCityChange.bind(this)}/>
        )
    }
    renderDistrict(){
        const {districts,receiver} = this.props;
        const district = receiver === null?"":receiver.districtCode;
        // console.log('district',districts)
        return (
            <Selected options={districts} 
                maxHeight="8rem" 
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