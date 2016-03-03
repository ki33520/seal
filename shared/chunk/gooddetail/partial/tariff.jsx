'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class Tariff extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="tariff-container">
            <Header onGoBack={this.props.changeScene.bind(this,"index")}>关税</Header>
            </div>
        )
    }
}

export default Tariff