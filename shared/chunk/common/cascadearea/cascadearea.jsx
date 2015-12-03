'use strict';

import React,{Component} from "react";
import SelectedSlide from "../../../component/selected/selectedslide.jsx";

class CascadeArea extends Component{
    componentDidMount(){
        const {loadProvinces} = this.props;
        loadProvinces();
    }
    componentDidUpdate(prevProps,prevState){
        const {receiver,loadCities,loadDistricts} = this.props;
        const province = receiver === null?"":receiver.province;
        const city = receiver === null?"":receiver.city;
        if(prevProps.provinces.length === 1 && 
        this.props.provinces.length > 1 && province !== undefined){
            loadCities(province);
        }
        if(prevProps.cities.length === 1 && 
        this.props.cities.length > 1 && city !== undefined){
            loadDistricts(city);
        }
    }
    handleProvinceChange(province){
        const {dispatch,changeField,loadCities} = this.props;
        dispatch(changeField("province",province));
        loadCities(province);
    }
    handleCityChange(city){
        const {dispatch,changeField,loadDistricts} = this.props;
        dispatch(changeField("city",city));
        loadDistricts(city)
    }
    handleDistrictChange(district){
        const {dispatch,changeField} = this.props;
        dispatch(changeField("district",district));
    }
    renderProvince(){
        const {provinces,receiver} = this.props;
        const province = receiver === null?"":receiver.province;
        if(provinces.length > 1){
            return (
                <div className="receiver-form-row">
                    <div className="receiver-form-label">省份</div>
                    <div className="receiver-form-field"><SelectedSlide options={provinces} 
                    maxHeight="8rem" 
                    value={province} onChange={this.handleProvinceChange.bind(this)}/></div>
                </div>
            )
        }
        return null;
    }
    renderCity(){
        const {cities,receiver,handleFieldChange} = this.props;
        const city = receiver === null?"":receiver.city;
        return (
            <div className="receiver-form-row">
                <div className="receiver-form-label">城市</div>
                <div className="receiver-form-field"><SelectedSlide options={cities} 
                maxHeight="8rem" 
                value={city} onChange={this.handleCityChange.bind(this)}/></div>
            </div>
        )
    }
    renderDistrict(){
        const {districts,receiver,handleFieldChange} = this.props;
        const district = receiver === null?"":receiver.district;
        // console.log('district',districts)
        return (
            <div className="receiver-form-row">
                <div className="receiver-form-label">区县</div>
                <div className="receiver-form-field"><SelectedSlide options={districts} 
                maxHeight="8rem" 
                value={district} onChange={this.handleDistrictChange.bind(this)}/></div>
            </div>
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