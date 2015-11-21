'use strict';

import React,{Component} from "react";

class Datepicker extends Component{
    year(){
        console.log(this.refs.year)
    }
    render(){
        const {memberInfo,birthdyChange} = this.props;
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
        for(let i=0;i<12;i++){
            let value = i+1;
            optionMonth.push((
                <option value={value} key={i}>{value}</option>
            ));
        };
        for(let i=0;i<30;i++){
            let value = i+1;
            optionDay.push((
                <option value={value} key={i}>{value}</option>
            ));
        };
        return (
            <div className="label-item" id={memberInfo.id}>
                <label>生日</label>
                <select ref="year" onFocus={this.year.bind(this)} onChange={birthdyChange.bind(this)}>
                    <option defaultValue="default" className="default">请选择</option>
                    {optionYear}
                </select>
                <span>年</span>
                <select ref="month">
                    <option defaultValue="default" className="default">请选择</option>
                    {optionMonth}
                </select>
                <span>月</span>
                <select ref="day">
                    <option defaultValue="default" className="default">请选择</option>
                    {optionDay}
                </select>
                <span>日</span>
            </div>
        )
    }
}

export default Datepicker;