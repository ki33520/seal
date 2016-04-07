'use strict';

import React,{Component} from "react";
import Selected from "../../../component/selected/selected.jsx";

class Datepicker extends Component{
    render(){
        const {year,month,day,max,birthdayChange} = this.props;
        var optionYear = [{label:"请选择",value:"-1"}],
            optionMonth = [{label:"请选择",value:"-1"}],
            optionDay = [{label:"请选择",value:"-1"}];
        const yearNow = new Date().getFullYear();
        for(let i=0;i<100;i++){
            let value = yearNow-i;
            optionYear.push({
                label: value,
                value: value
            });
        };
        for(let i=1;i<13;i++){
            let value = i<10?'0'+i:i;
            optionMonth.push({
                label: value,
                value: value
            });
        };
        for(let i=1;i<=max;i++){
            let value = i<10?'0'+i:i;
            optionDay.push({
                label: value,
                value: value
            });
        };
        return (
            <div className="label-item">
                <label>生日</label>
                <Selected placeholder="请选择" className="selected year" options={optionYear} closeOnSelect={true} 
                    maxHeight="5rem" 
                    value={year} onChange={birthdayChange.bind(this,"birthday","year")}/>
                <span>年</span>
                <Selected placeholder="请选择" className="selected month" options={optionMonth} closeOnSelect={true} 
                    maxHeight="5rem" 
                    value={month} onChange={birthdayChange.bind(this,"birthday","month")}/>
                <span>月</span>
                <Selected placeholder="请选择" className="selected day" options={optionDay} closeOnSelect={true} 
                    maxHeight="5rem" 
                    value={day} onChange={birthdayChange.bind(this,"birthday","day")}/>
                <span>日</span>
            </div>
        )
    }
}

export default Datepicker;