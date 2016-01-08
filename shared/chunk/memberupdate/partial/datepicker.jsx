'use strict';

import React,{Component} from "react";

class Datepicker extends Component{
    render(){
        const {year,month,day,max,birthdyChange} = this.props;
        var optionYear = [],
            optionMonth = [],
            optionDay = [];
        const yearNow = new Date().getFullYear();
        for(let i=0;i<100;i++){
            let value = yearNow-i;
            optionYear.push((
                <option value={value} key={i}>{value}</option>
            ));
        };
        for(let i=1;i<13;i++){
            let value = i<10?'0'+i:i;
            optionMonth.push((
                <option value={value} key={i}>{value}</option>
            ));
        };
        for(let i=1;i<=max;i++){
            let value = i<10?'0'+i:i;
            optionDay.push((
                <option value={value} key={i}>{value}</option>
            ));
        };
        return (
            <div className="label-item">
                <label>生日</label>
                <select value={year} name="year" onChange={birthdyChange.bind(this,"birthdy")}>
                    <option value="-1">请选择</option>
                    {optionYear}
                </select>
                <span>年</span>
                <select value={month} name="month" onChange={birthdyChange.bind(this,"birthdy")}>
                    <option value="-1">请选择</option>
                    {optionMonth}
                </select>
                <span>月</span>
                <select value={day} name="day" onChange={birthdyChange.bind(this,"birthdy")}>
                    <option value="-1">请选择</option>
                    {optionDay}
                </select>
                <span>日</span>
            </div>
        )
    }
}

export default Datepicker;