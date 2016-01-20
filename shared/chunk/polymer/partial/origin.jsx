'use strict';

import React,{Component} from "react";
import Loading from "../../common/loading.jsx";
import _ from "lodash";

class Origin extends Component{
    constructor(props){
        super(props);
    }
    renderOrigin(){
        let {origins} = this.props.allOrigin
        if(origins){
            return origins.map((origin,i)=>{
                return <a href="#" key={i}><img src={origin.backgroundImageUrl}/></a>
            })
        }
        return null        
    }
    render(){
        const isFetching = _.isEmpty(this.props.allOrigin) ? true
            :this.props.allOrigin.originFetching
        return (
            <div>
                <div className="kindArea">
                {this.renderOrigin()}
                </div>
                <Loading active={isFetching}/>
            </div>
        )
    }
}

export default Origin