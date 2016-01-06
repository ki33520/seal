'use strict';

import React,{Component} from "react";

class Origin extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div className="kindArea">
                    <a href="#"><img src="/client/asset/images/area_usa.gif"/></a>
                    <a href="#"><img src="/client/asset/images/area_korea.gif"/></a>
                    <a href="#"><img src="/client/asset/images/area_japan.gif"/></a>
                </div>
            </div>
        )
    }
}

export default Origin