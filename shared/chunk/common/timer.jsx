'use strict';

import React,{Component} from "react";
import moment from "moment";
import _ from "lodash";

class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
            duration:0
        }
    }
    restOfTime(duration){
        if(duration <= 0){
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
        CHour = CHour < 10 ? ("0" + CHour) : CHour
        let CMinute = minutes % 60
        CMinute = CMinute < 10 ? ("0" + CMinute) : CMinute
        let CSecond = Math.floor(seconds % 60)
        CSecond = CSecond < 10 ? ("0" + CSecond) : CSecond
        return {
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
            diffTime = moment(referTime,format).diff(moment())
        }
        let interval = ()=>{
            const nowTime = moment()
            if(endTime){
                let duration = moment(endTime,format) - nowTime + diffTime
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
        let {hour,minute,second} = this.restOfTime(duration)
        let compiled = _.template(this.props.template);
        let durationContent = compiled({
            hour,minute,second
        })
        return (
            <span className="timer">{durationContent}</span>
        )
    }
}

Timer.defaultProps = {
    referTime:null,
    endTime:null,
    format:"YYYY-MM-DD HH:mm:ss",
    template:`<%= hour %>:<%= minute %>:<%= second %>`
}

export default Timer;