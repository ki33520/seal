'use strict';

import React,{Component} from "react";
// import moment from "moment";
import _ from "../../lib/lodash.es6";

function parseDate(date){
    date = date.split(" ").join("T")
    return Date.parse(date)
}

function formatDate(timestamp){
    const date = new Date(timestamp)
    let dateStr = date.toISOString()
    return dateStr.replace(/\.\d{3}Z$/g,"").split("T").join(" ")
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
        const {endTime,referTime,format} = this.props;
        let diffTime = 0
        if(referTime){
            diffTime = parseDate(referTime) - Date.now()
            // diffTime = moment(referTime,format).diff(moment())
        }
        let interval = ()=>{
            // const nowTime = moment()
            const nowTime = Date.now()
            if(endTime){
                // let duration = moment(endTime,format) - nowTime + diffTime
                let duration = parseDate(endTime) - nowTime + diffTime
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
    dayEnable:false,
    onTimerExpire:()=>{},
    // format:"YYYY-MM-DD HH:mm:ss",
    template:`<%= hour %>:<%= minute %>:<%= second %>`
}

export default Timer;