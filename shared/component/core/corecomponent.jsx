'use strict';

import React,{Component} from "react";

class CoreComponent extends Component{
    alert(content,delay){
        this.setState({
            alert:{
                active:true,content
            }
        },()=>{
            setTimeout(()=>{
                this.setState({
                    alert:{
                        active:false,content:""
                    }
                })
            },delay)
        })
    }
}

export default CoreComponent;