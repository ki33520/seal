'use strict';

import React,{Component} from "react";

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
        return (
            <div>
                <div className="kindArea">
                {this.renderOrigin()}
                </div>
            </div>
        )
    }
}

export default Origin