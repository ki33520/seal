'use strict';

import React,{Component} from "react";
import _ from "../../lib/lodash.es6";

function parseDate(date){
    date = date.split(" ").join("T")
    date = new Date(date)
    const timezoneOffset = date.getTimezoneOffset() * 60000
    const timestamp = date.getTime() + timezoneOffset
    return timestamp
}

function formatDate(timestamp){
    const dateObj = new Date(timestamp)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()
    const second = dateObj.getSeconds()
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
            duration:null
        }
    }
    restOfTime(duration){
        if(duration <= 0){
            this.props.onTimerExpire()
            return {
                hour:"00",
                second:"00",
                minute:"00"
            }
        }
        let seconds = duration / 1000
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        let CHour = hours
        let CDay,days;
        if(this.props.dayEnable){
            days = Math.floor(hours / 24)
            CDay = days
            CHour = hours % 24
        }
        CHour = CHour < 10 ? ("0" + CHour) : CHour
        let CMinute = minutes % 60
        CMinute = CMinute < 10 ? ("0" + CMinute) : CMinute
        let CSecond = Math.floor(seconds % 60)
        CSecond = CSecond < 10 ? ("0" + CSecond) : CSecond
        return {
            day:CDay,
            hour:CHour,minute:CMinute,second:CSecond
        }
    }
    componentDidMount(){
        this.tickTack()
    }
    componentWillUnmount(){
        clearTimeout(this.timeout)
    }
    tickTack(){
        const {format,isTimestamp} = this.props;
        let referTime = this.props.referTime
        let endTime = isTimestamp?this.props.endTime:parseDate(this.props.endTime)
        let diffTime = 0
        if(referTime){
            referTime = isTimestamp?referTime:parseDate(referTime)
            diffTime = referTime - Date.now()
            // diffTime = moment(referTime,format).diff(moment())
        }
        let interval = ()=>{
            // const nowTime = moment()
            const nowTime = Date.now()
            if(endTime){
                let duration = endTime - nowTime + diffTime
                this.setState({
                    duration
                })
            }
            this.timeout = setTimeout(interval,1000)            
        }
        interval()
    }
    componentDidUpdate(prevProps){
        const {endTime} = this.props;
        if(endTime && prevProps.endTime === null){
            this.tickTack()
        }
    }
    render(){
        const {duration} = this.state
        if(duration === null){
            return null
        }
        let {day,hour,minute,second} = this.restOfTime(duration)
        let compiled = _.template(this.props.template);
        let durationContent = compiled({
            day,hour,minute,second
        })
        return (
            <span className="timer" dangerouslySetInnerHTML={{__html:durationContent}}></span>
        )
    }
}

Timer.defaultProps = {
    referTime:null,
    endTime:null,
    isTimestamp:false,
    dayEnable:false,
    onTimerExpire:()=>{},
    // format:"YYYY-MM-DD HH:mm:ss",
    template:`<%= hour %>:<%= minute %>:<%= second %>`
}

export default Timer;